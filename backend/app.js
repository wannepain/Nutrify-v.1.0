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
// app.post("/signup/nutrition", async (req, res) => { //must have a username parameter
//     //expects a json in this format:
//     // {
//     //     "username": "Marek",
//     //     "allergies": ["peanuts", "shellfish"],
//     //     "diet": "vegetarian",
//     //     "weight": 70,
//     //     "height": 175,
//     //     "goal": "lose",
//     //     "gender": "m",
//     //     "age": 30,
//     //     "actiFac": "moderate"
//     //   }
//     const { username, allergens: allergies, diet, weight, height, goal, gender, age, actiFac } = req.body;
//     try {
//         const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);
//         if (userExists.rows.length === 0) {
//             res.status(409).json({ message: "user not found" }); // Assuming you want to return "user found" for conflict
//             console.log("user not found");
//         } else {
//             const dailyCalories = calcDailyCalories(allergies, diet, weight, height, goal, gender, age, actiFac)
//             let daily_meals;
//             if (dailyCalories < 2500) {
//                 daily_meals = 3;
//             } else if (dailyCalories >= 2500 && dailyCalories < 3400) {
//                 daily_meals = 4;
//             } else {
//                 daily_meals = 5;
//             }            
//             try {
//                 const result = await db.query("INSERT INTO user_nutri_info (user_id, allergies, diet, current_weight, height, goal, gender, age, acti_fac, daily_meals) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
//                     userExists.rows[0].id, allergies, diet, weight, height, goal, gender, age, actiFac, daily_meals
//                 ]);
//                 // const result2 = await db.query("INSERT INTO weekly_recipes (sunday, monday, tuesday, wednesday, thursday, friday, saturday, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [
//                 //     getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), userExists.rows[0].id
//                 // ]);                
//                 res.status(200).json({ message: "users nutrition information added successfully" });
//             } catch (error) {
//                 console.log(error);
//                 res.status(500).json({ message: "error occurred while querying" });
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "error occurred while querying" });
//     }
//     try {
//         const result2 = await db.query("INSERT INTO weekly_recipes (sunday, monday, tuesday, wednesday, thursday, friday, saturday, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [
//             getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), getDailyMenu(userExists.rows[0].id), userExists.rows[0].id
//         ]);
//     } catch (error) {
//         console.log("error");
//     }
// });
////////////////////////////// MENU CREATION ////////////////////////////////////////////////////////////////////

app.post("/signup/nutrition", async (req, res) => {
    const { username, allergies, diet, weight, height, goal, gender, age, actiFac } = req.body;
    console.log(username);
    
    try {
        // Check if username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);

        if (userExists.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // const dailyCalories = await calcDailyCalories(gender, weight, height, age, actiFac, goal);
        // const dailyCalories = await calcDailyCalories(gender, weight, height);
        const dailyCalories = await calcDailyCalories(null, gender, weight, height, age, actiFac, goal);
        let daily_meals;

        // Determine number of daily meals based on daily calories
        if (dailyCalories < 2500) {
            daily_meals = 3;
        } else if (dailyCalories < 3400) {
            daily_meals = 4;
        } else {
            daily_meals = 5;
        }
        // Insert user nutrition information into database
        const result1 = await db.query("INSERT INTO user_nutri_info (user_id, allergies, diet, current_weight, height, goal, gender, age, acti_fac, daily_meals) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [
            userExists.rows[0].id, allergies, diet, weight, height, goal, gender, age, actiFac, daily_meals
        ]);
        console.log("result 1=", result1);
        // Insert weekly recipes
        const paramsArray = [userExists.rows[0].id, await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id), await getDailyMenu(userExists.rows[0].id)];
        console.log(paramsArray);
        const result2 = await db.query("INSERT INTO weekly_recipes (user_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
            paramsArray
        );
        console.log(result2);
        res.status(200).json({ message: "User's nutrition information added successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while processing the request" });
    }
});

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
    //     "meal": "lunch" or "breakfast" or "dinner"
    //     "course": "first" or "main" or "desert"
    //   }
    const { username, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats, meal, course } = req.body;
    try {
        const userExists = await db.query("SELECT id FROM users WHERE username = $1", [username]);
        if (userExists.rows.length === 0) {
            res.status(409).json({ message: "user not found" }); // Assuming you want to return "user not found" for conflict
        } else {
            try {
                const result = await db.query("INSERT INTO recipes (user_id, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats, meal, course) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", [
                    userExists.rows[0].id, rec_name, rec_img, ingredients, procedure, allergies, diet, calories, proteins, carbs, fats, meal, course
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

app.post("/weeklyRecipes", async (req, res) => {
    const { id } = idFromHeader(req.headers.authorization);
    // const id = req.body.id
    console.log(id);
    try {
        // const id = 3;
        const d = new Date();
        if (d.getDay() === 0) { // if today is Sunday
            console.log("today is sunday");
            const result = await db.query("UPDATE weekly_recipes SET sunday=$1, monday=$2, tuesday=$3, wednesday=$4, thursday=$5, friday=$6, saturday=$7 WHERE user_id = $8 RETURNING monday, tuesday, wednesday, thursday, friday, saturday, sunday", [
                getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), getDailyMenu(id), id
            ]); 
            res.status(200).json({ weekRecipes: result.rows });
        } else {
            console.log("different day");
            const result = await db.query("SELECT monday, tuesday, wednesday, thursday, friday, saturday, sunday FROM weekly_recipes WHERE user_id = $1", [id]);
            console.log(result);
            res.status(200).json({ weekRecipes: result.rows });
        }
    } catch (error) {
        console.error("Error retrieving or updating weekly recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/getrecipe", async (req, res)=>{
    const {id} = req.body;
    try {
        const result = await db.query("SELECT * FROM recipes WHERE id = $1", [id]);
        res.status(200).json({data: result.rows[0]})
    } catch (error) {
        console.log(error);
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
        console.log(293, user.id);
        return res.status(200).json({ message: "Authentication successful", user: user , token: token });
      });
    })(req, res, next);
  });

//Actifac calculation:
// async function calcDailyCalories(user_id, gender, current_weight, height, age, acti_fac, goal) {
//         let user;
//         if(user_id !=null){
//             try {
//                 const result = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [user_id]);
//             if (result.rows.length === 0) {
//                 return 0;
//             } else{
//                 user = result.rows[0];
//                 const { gender, current_weight, height, age, acti_fac, goal } = user;
//                 let BMR;
//                 let cals;
//                 let maxCals;
//                 switch (gender) {
//                     case "m":
//                         BMR = 88.362 + (13.397 * current_weight) + (4.799 * height) - (5.677 * age);
//                         break;

//                     case "f":
//                         BMR = 447.593 + (9.247 * current_weight) + (3.098 * height) - (4.330 * age);
//                         break;
//                     default:
//                         BMR = 404;
//                         break;
//                 }
                
//                 switch (acti_fac) {
//                     case "sedentary":
//                         cals = BMR * 1.2;
//                         break;
//                     case "light":
//                         cals = BMR * 1.375;
//                         break;
//                     case "moderate":
//                         cals = BMR * 1.55;
//                         break;
//                     case "active":
//                         cals = BMR * 1.725;
//                         break;
//                     case "very_active":
//                         cals = BMR * 1.9;
//                         break;
//                     default:
//                         cals = "sedentary, light, moderate, active, very_active";
//                         break;
//                 }
//                 if (goal === "lose") {
//                     maxCals = Math.round(cals - 550);
//                 } else if (goal === "gain") {
//                     maxCals = Math.round(cals + 350);
//                 } else {
//                     maxCals = Math.round(cals);
//                 }
//                 return maxCals;
//             }
//             } catch (error) {
//                 console.log(error);
//                 return "error occurred while querying";
//             }
//         } else{
//             let BMR;
//             let cals;
//             let maxCals;
//             switch (gender) {
//                 case "m":
//                     BMR = 88.362 + (13.397 * current_weight) + (4.799 * height) - (5.677 * age);
//                     break;

//                 case "f":
//                     BMR = 447.593 + (9.247 * current_weight) + (3.098 * height) - (4.330 * age);
//                     break;
//                 default:
//                     BMR = 404;
//                     break;
//             }
            
//             switch (acti_fac) {
//                 case "sedentary":
//                     cals = BMR * 1.2;
//                     break;
//                 case "light":
//                     cals = BMR * 1.375;
//                     break;
//                 case "moderate":
//                     cals = BMR * 1.55;
//                     break;
//                 case "active":
//                     cals = BMR * 1.725;
//                     break;
//                 case "very_active":
//                     cals = BMR * 1.9;
//                     break;
//                 default:
//                     cals = "sedentary, light, moderate, active, very_active";
//                     break;
//             }
//             if (goal === "lose") {
//                 maxCals = Math.round(cals - 550);
//             } else if (goal === "gain") {
//                 maxCals = Math.round(cals + 350);
//             } else {
//                 maxCals = Math.round(cals);
//             }
//             return maxCals;
//         }
//     }
async function calcDailyCalories(user_id, gender, current_weight, height, age, acti_fac, goal) {
    // console.log(407, user_id);
    if (user_id != null && user_id !== undefined) {
        try {
            const result = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [user_id]);
            if (result.rows.length === 0) {
                return 0;
            } else {
                const user = result.rows[0];
                const { gender, current_weight, height, age, acti_fac, goal } = user;
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
            console.log(461, error);
            return "error occurred while querying";
        }
    } else {
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
}

        
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
        console.error(522, 'Token verification failed:', error);
        // res.status(401).send('Unauthorized');
        return error
    }
}


async function selectRecipes(mealCalories, nutriInfo, meal) {
    let totalCalories = 0;
    let courses;
    const selectedRecs = {
        first: null,
        main: null,
        dessert: null,
        };
        

    if (meal === "breakfast" || meal === "snack") {
        courses = {
            total: 1,
            courseCal: [mealCalories],
            course: ["main"]
        };
    } else {
        courses = {
            total: 3,
            courseCal: [(mealCalories / 100) * 10, (mealCalories / 100) * 60, (mealCalories / 100) * 30],
            course: ["first", "main", "dessert"]
        };
    }
    while (totalCalories < mealCalories) {
        

        for (let i = 0; i < courses.total; i++) {
            let currentCourseCalories = Math.floor(courses.courseCal[i]);
            let currentCourse = courses.course[i];
            let selectedRecipeIds = [];

            let query = `SELECT id FROM recipes WHERE $1 = ANY(diet) AND calories <= $2 AND $3 = ANY(meal) AND course = $4`;
            
            if (selectedRecs[courses.course[i - 1]] != null) { //if previous course has a value 
                
                selectedRecipeIds.push(selectedRecs[courses.course[i - 1]].id); //adds the previous recipe id to the selected array
                console.log(selectedRecipeIds);
                query += ` AND id NOT IN (${selectedRecipeIds.map((_, i) => `$${i + 5}`).join(', ')})`;
            }

            query += ` ORDER BY RANDOM() LIMIT 1`;

            try {
                const paramsArray = selectedRecs[courses.course[i - 1]] != null
                    ? [nutriInfo.rows[0].diet, currentCourseCalories, meal, currentCourse, ...selectedRecipeIds] 
                    : [nutriInfo.rows[0].diet, currentCourseCalories, meal, currentCourse];

                const result = await db.query(query, paramsArray);

                if (result.rows.length === 0) {
                    console.log(`No recipes available for ${currentCourse}`);
                    //totalCalories = mealCalories; // to break the while loop 
                    continue;
                }

                const selectedRec = result.rows[0];
                totalCalories += selectedRec.calories;
                selectedRecs[currentCourse] = selectedRec.id;
            } catch (error) {
                console.error("Error selecting recipe:", error);
                // Handle error gracefully, possibly retry or skip this iteration
                break;
            }
        }
    }

    return selectedRecs;
}


async function getDailyMenu(id) {
    if (!id){
        // res.status(407).json({message: "Invalid jwt token"});
        console.log("Id cant be undefined");
        return null;
    }
    try {
        const nutriInfo = await db.query("SELECT * FROM user_nutri_info WHERE user_id = $1", [id]);
        //console.log("userNutri info in getDailyMenu = ", nutriInfo); //////////////////////////////////////////////////////////////////////////////////////ERROR HERE - userDailyMEals is undefined ////////////////////////////////////////////////////////
        const userDailyMeals = nutriInfo.rows[0].daily_meals;
        console.log("userDailyMeals=",userDailyMeals);
        const dailyCalories = await calcDailyCalories(id);
        const mealCalories = Math.floor(dailyCalories / userDailyMeals);
        console.log(`mealCalories=${mealCalories}, dailyCalories=${dailyCalories}`);
        let dailyRecipes
        switch (userDailyMeals) {
            case 3:
                    console.log("case 3");
                    dailyRecipes = {
                        breakfast: await selectRecipes(mealCalories, nutriInfo, "breakfast"),
                        lunch: await selectRecipes(mealCalories, nutriInfo, "lunch"), 
                        dinner: await selectRecipes(mealCalories, nutriInfo, "dinner")
                    }
                break;
            case 4:
                    console.log("case 4");
                    dailyRecipes = {
                        breakfast: await selectRecipes(mealCalories, nutriInfo, "breakfast"),
                        snack: await selectRecipes(mealCalories, nutriInfo, "snack"),
                        lunch: await selectRecipes(mealCalories, nutriInfo, "lunch"), 
                        dinner: await selectRecipes(mealCalories, nutriInfo, "dinner")
                    }
                break;

            case 5:
                    console.log(("case 5"));
                    dailyRecipes = {
                        breakfast: await selectRecipes(mealCalories, nutriInfo, "breakfast"),
                        snack: await selectRecipes(mealCalories, nutriInfo, "snack"),
                        lunch: await selectRecipes(mealCalories, nutriInfo, "lunch"),
                        snack: await selectRecipes(mealCalories, nutriInfo, "snack"),
                        dinner: await selectRecipes(mealCalories, nutriInfo, "dinner")
                }
                break;
            default:
                console.log(742, "default");
                break;
        }
        // console.log(dailyRecipes);

        return dailyRecipes;
    } catch (error) {
        console.log(747, error);
        return null;
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