import Express from "express";
// import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser"
import passport from "passport";
import session from "express-session";
import  {Strategy}  from "passport-local";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// dotenv.config();

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
// Authenticate route 
app.post('/login', function(req, res, next) {
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
  
// app.post("/authenticate", async (req, res) => {
//     try {
//         // Trim the username field to remove any extra spaces
//         const username = req.body.username.trim();
//         const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
//         console.log(req.body, result);
//         if (result.rows.length === 1) {
//             const user = result.rows[0];
//             // Compare hashed passwords
//             bcrypt.compare(req.body.password, result.rows[0].password, (err, result)=>{
//              if (err) {
//                 console.log(err);
//                 res.sendStatus(500);
//              } else {
//                 if (result) {
//                     console.log("User authenticated");
//                     res.send(user); // Send success response
//                 } else {
//                     console.log("Incorrect password");
//                     res.sendStatus(401); // Unauthorized
//                 }
//              }   
//             })
//         } else {
//             console.log("User not found");
//             res.sendStatus(404); // Not found
//         }
//     } catch (error) {
//         console.log("Error occurred:", error);
//         res.sendStatus(500); // Internal server error
//     }
// });

// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/loginsuccess",
//     failureRedirect: "/loginfailure",
// }));

// app.get("/loginfailure", (req, res)=>{
//     console.log(req);
//     console.log(req.user);
//     res.sendStatus(404)
// });

// app.get("/loginsuccess", (req, res)=>{
//     res.sendStatus(200);
// });

// app.get("/", async (req, res)=>{
//     let result;
//     try {
//         result =  await db.query("SELECT username FROM users WHERE id = 1");
//         console.log(result)
//     } catch (error) {
//         result = error;
//         console.log(result)
//     }
//     res.send(result);
// })




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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});