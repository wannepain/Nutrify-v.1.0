import Express from "express";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser"
import passport from "passport";
import session from "express-session";
import  {Strategy}  from "passport-local";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import GoogleStrategy from "passport-google-oauth2";

const app = Express();
const port = 3000;
const saltRounds = 10;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Nutrify",
    password: "wannepain2008",
    port: 5432
});

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    secret: "QWERTY",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport session serialization and deserialization
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(id, cb) {
    // Fetch user from the database based on id
    // For example:
    cb(null, user)
});

db.connect((err)=>{
    console.log(err);
})

//////////////////////////////// Adding users into the database ////////////////////////////////////////////////////
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the username already exists in the database
        const userExists = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            // Username already exists
            console.log("Username already exists");
            res.sendStatus(409); // Conflict
        } else {
            // Hash the password
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    // Insert the new user into the database
                    const result = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hash]);
                    const newUser = result.rows[0];
                    console.log("User registered:", newUser);
                    res.sendStatus(201); // Created
                }
            });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        res.sendStatus(500);
    }
});
app.post("/signup/nutrition", async (req, res) => { //must have a username parameter
    //expects a json in this format:
    // {
    //     "username": "Marek",
    //     "allergies": ["peanuts", "shellfish"],
    //     "diet": "vegetarian",
    //     "weight": 70,
    //     "height": 175,
    //     "goal": "lose",
    //     "gender": "m",
    //     "age": 30,
    //     "actiFac": "moderate"
    //   }
    const { username, allergies, diet, weight, height, goal, gender, age, actiFac } = req.body;
    try {
        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);
        if (userExists.rows.length === 0) {
            res.status(409).json({ message: "user not found" }); // Assuming you want to return "user found" for conflict
        } else {
            try {
                const result = await db.query("INSERT INTO user_nutri_info (user_id, allergies, diet, current_weight, height, goal, gender, age, acti_fac) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
                    userExists.rows[0].id, allergies, diet, weight, height, goal, gender, age, actiFac
                ]);
                res.status(200).json({ message: "users nutrition information added successfully" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "error occurred while querying" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error occurred while querying" });
    }
});
////////////////////////////// MENU CREATION ////////////////////////////////////////////////////////////////////
app.post("/add/recipe", async (req, res) => {
    //expects a json in this format:
    // {
    //     "username": "example_user",
    //     "rec_name": "Spaghetti Carbonara",
    //     "rec_img": "https://example.com/spaghetti_carbonara.jpg",
    //     "ingredients": ["spaghetti", "bacon", "eggs", "parmesan cheese", "black pepper"],
    //     "procedure": "1. Cook spaghetti according to package instructions. 2. Fry bacon until crispy. 3. Beat eggs and mix with grated parmesan cheese. 4. Toss cooked spaghetti with bacon and egg mixture. 5. Season with black pepper. 6. Serve hot.",
    //     "allergies": ["None"],
    //     "diet": ["None"],
    //     "calories": 600,
    //     "proteins": 25,
    //     "carbs": 70,
    //     "fats": 28
    //   }
    const { username, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats } = req.body;
    try {
        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);
        if (userExists.rows.length === 0) {
            res.status(409).json({ message: "user not found" }); // Assuming you want to return "user not found" for conflict
        } else {
            try {
                const result = await db.query("INSERT INTO recipes (user_id, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
                    userExists.rows[0].id, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats
                ]);
                res.status(200).json({ message: "recipe added successfully" });
            } catch (error) {
                if (error.constraint === 'unique_recipe'){
                    res.status(409).json({ error: "Recipe already exists" });
                    console.log("Recipe already exists")
                } else{
                    console.log(error);
                    res.status(500).json({ message: "error occurred while querying" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error occurred while querying" });
    }
});

app.post("/dailyMenu", async (req, res) => {
    try {
        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [req.body.username]);
        if (userExists.rows.length === 0) {
            return res.status(409).json({ message: "user not found" });
        }

        const nutriInfo = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [userExists.rows[0].id]);
        const dailyCalories = await calcDailyCalories(userExists.rows[0].id);
        let totalCalories = 0;
        const selectedRecs = [];

        while (totalCalories <= dailyCalories) {
            // Calculate the remaining calories available for the daily limit
            const remainingCalories = dailyCalories - totalCalories;

            // Query to select a random recipe that matches the user's diet and does not contain any allergies
            const result = await db.query("SELECT * FROM recipes WHERE diet = $1 AND allergies != $2 AND calories <= $3 ORDER BY RANDOM() LIMIT 1", [nutriInfo.rows[0].diet, nutriInfo.rows[0].allergies, remainingCalories]);

            // If no recipes are available or adding the next recipe will exceed the daily calorie limit, break out of the loop
            if (result.rows.length === 0) {
                console.log("no recipes available");
                res.status(407).json({message: "no recipes available"})
                break;
            }

            // Add the selected recipe to the list of selected recipes
            const selectedRec = result.rows[0];
            totalCalories += selectedRec.calories;

            selectedRecs.push(selectedRec);
        }

        console.log(totalCalories, dailyCalories);
        res.status(200).json(selectedRecs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error occurred while processing the request" });
    }
});


// Authenticate route 
app.post('/login/local', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) { 
        return res.status(401).json({ message: "Authentication failed" });
      }
      req.logIn(user, function(err) {
        if (err) { 
          return res.status(500).json({ message: "Internal server error" });
        }
        const token = jwt.sign({ username: user.username }, 'QWERTY', { expiresIn: '1h' }); //creates a token for the front end
        return res.status(200).json({ message: "Authentication successful", user: user , token: token });
      });
    })(req, res, next);
  });

//Actifac calculation:
async function calcDailyCalories(user_id) {
    try { 
        const user = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [user_id]);
        if (user.rows.length === 0) {
            return 0;
        } else {
            const { gender, current_weight, height, age, acti_fac, goal } = user.rows[0];
            let BMR;
            let cals;
            let maxCals;
            switch (gender) {
                case "m":
                    BMR = 88.362 + (13.397 * current_weight) + (4.799 * height) - (5.677 * age);
                    break;

                case "f":
                    BMR = 447.593 + (9.247 * current_weight) + (3.098 * height) - (4.330 * age);
                    break;
                default:
                    BMR = 404;
                    break;
            }
            
            switch (acti_fac) {
                case "sedentary":
                    cals = BMR * 1.2;
                    break;
                case "light":
                    cals = BMR * 1.375;
                    break;
                case "moderate":
                    cals = BMR * 1.55;
                    break;
                case "active":
                    cals = BMR * 1.725;
                    break;
                case "very_active":
                    cals = BMR * 1.9;
                    break;
                default:
                    cals = "sedentary, light, moderate, active, very_active";
                    break;
            }
            if (goal === "lose") {
                maxCals = Math.round(cals - 550);
            } else if (goal === "gain") {
                maxCals = Math.round(cals + 350);
            } else {
                maxCals = Math.round(cals);
            }
            return maxCals;
        }
    } catch (error) {
        return "error occurred while querying";
    }
};
// Passport local strategy configuration
passport.use(new Strategy(
    async function(username, password, done) {
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //   });
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
            console.log(result);
            if (result.rows.length === 1) {
                const user = result.rows[0];
                // Compare hashed passwords
                bcrypt.compare(password, result.rows[0].password, (err, result)=>{
                    if (err) {
                        console.log(err);
                        return done(err);
                    } else {
                        if (result) {
                            console.log("User authenticated");
                            //Send success response
                            return done(null, user); 
                        } else {
                            console.log("Incorrect password");
                            // Unauthorized
                            return done(null, false);
                        }
                    }   
                });
            } else {
                console.log("User not found");
                // Not found
                return done(null, false);
            }
        } catch (error) {
            console.log("Error occurred:", error);
            // Internal server error
            return done(error);
        }
    }
  ));

// passport.use(
//     new GoogleStrategy({
//     clientID:     process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/",
//     passReqToCallback   : true
//   },
//   async function(request, accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//     console.log(profile);
//     try {
//         const userExists = await db.query("SELECT * FROM users WHERE username = $1",
//             [profile.email]
//         );
//         if (userExists.rows.length === 0) {
//             const newUser = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [profile.email, "google"]);
//             const user = newUser.rows[0];
//             console.log(user);
//             return done(null, user);
//         } else {
//             console.log("user already added", userExists.rows[0]);
//             return done(null, userExists.rows[0]);
//         }
//     } catch (error) {
//         console.log(error)
//         return done(error);
//     }
//   }
// ));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});