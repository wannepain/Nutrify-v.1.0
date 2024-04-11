import Express, { query } from "express";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser"
import passport from "passport";
import session from "express-session";
import  {Strategy}  from "passport-local";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow sending cookies from the client
  }));
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
    const { username, allergens: allergies, diet, weight, height, goal, gender, age, activity: actiFac } = req.body;
    try {
        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);
        if (userExists.rows.length === 0) {
            res.status(409).json({ message: "user not found" }); // Assuming you want to return "user found" for conflict
            console.log("user not found");
        } else {
            try {
                const result = await db.query("INSERT INTO user_nutri_info (user_id, allergies, diet, current_weight, height, goal, gender, age, acti_fac) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
                    userExists.rows[0].id, allergies, diet, weight, height, goal, gender, age, actiFac
                ]);
                const result2 = await db.query("INSERT INTO weekly_recipes (sunday, monday, tuesday, wednesday, thursday, friday, saturday, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [
                    getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), userExists.rows[0].id
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

app.get("/weeklyRecipes", async (req, res) => {
    try {
        const { id } = idFromHeader(req.headers.authorization);
        const d = new Date();
        if (d.getDay() === 0) { // if today is Sunday
            console.log("today is sunday");
            const result = await db.query("UPDATE weekly_recipes SET sunday=$1, monday=$2, tuesday=$3, wednesday=$4, thursday=$5, friday=$6, saturday=$7 WHERE userid = $8 RETURNING *", [
                getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), id
            ]); 
            res.status(200).json({ weekRecipes: result.rows });
        } else {
            console.log("different day");
            const result = await db.query("SELECT * FROM weekly_recipes WHERE userid = $1", [id]);
            console.log(result);
            res.status(200).json({ weekRecipes: result.rows });
        }
    } catch (error) {
        console.error("Error retrieving or updating weekly recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/testPost", (req, res) => {
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const d = new Date();
    let prevDay = weekday[d.getDay() - 1];
    console.log(prevDay);
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
        const token = jwt.sign({ id: user.id }, 'QWERTY', { expiresIn: '24h' }); //creates a token for the front end
        console.log(user.id);
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
function idFromHeader(headerAuthorization) { // expects the req.headers.authorization !!
    const token = headerAuthorization.split(' ')[1];
    // Now you can verify the JWT token or use its information as needed
    // For example:
    try {
        const decodedToken = jwt.verify(token, 'QWERTY');
        // console.log(decodedToken);
        // res.send('Token verified successfully');
        return decodedToken
    } catch (error) {
        console.error('Token verification failed:', error);
        // res.status(401).send('Unauthorized');
        return error
    }
}
async function selectRecipes(dailyCalories, nutriInfo) {
    let totalCalories = 0;
    const selectedRecs = [];
    while (totalCalories < dailyCalories) {
        const remainingCalories = dailyCalories - totalCalories;

        const selectedRecipeIds = selectedRecs.map(rec => rec.id);
        let query = `SELECT * FROM recipes WHERE diet = $1 AND allergies != $2 AND calories <= $3`;
        if (selectedRecipeIds.length > 0) {
            query += ` AND id NOT IN (${selectedRecipeIds.map((_, i) => `$${i + 4}`).join(', ')})`;
        }
        query += ` ORDER BY RANDOM() LIMIT 1`;// creates a query that is acceptable 

        const paramsArray = selectedRecipeIds.length > 0 // the number of parameters must match the $ in query
            ? [nutriInfo.rows[0].diet, nutriInfo.rows[0].allergies, remainingCalories, ...selectedRecipeIds] 
            : [nutriInfo.rows[0].diet, nutriInfo.rows[0].allergies, remainingCalories];

        const result = await db.query(query, paramsArray);

        if (result.rows.length === 0) {
            console.log("No more recipes available within calorie limit");
            break;
        }

        const selectedRec = result.rows[0];
        totalCalories += selectedRec.calories;
        selectedRecs.push(selectedRec);
    }
    return selectedRecs;
}
async function getDailyMenu(id) {
    if (id === undefined){
        // res.status(407).json({message: "Invalid jwt token"});
        return "Id cant be undefined"
    }
    try {
        const nutriInfo = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [id]);
        const dailyCalories = await calcDailyCalories(id);
        const selectedRecs = await selectRecipes(dailyCalories, nutriInfo);
        console.log(selectedRecs);

        return selectedRecs;
    } catch (error) {
        console.log(error);
        return "Error occurred while processing the request";
    }
}
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