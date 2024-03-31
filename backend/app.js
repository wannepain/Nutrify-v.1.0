import Express from "express";
import env from "dotenv";
import pg from "pg";
import bodyParses from "body-parser"

const app = Express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Nutrify",
    password: "wannepain2008",
    port: 5432
})

app.use(bodyParses.urlencoded({extended: true}));

db.connect()
//create route that determines if user is authenticated or not 
// app.get("/isAuthenticated", (req, res)=>{

// });
// create route decides if a user is logged in or not 
app.post("/isLoggedIn", async (req, res) => {
    let isLoggedIn = false;
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
        if (result.rows.length === 1) {
            isLoggedIn = true;
        }
    } catch (error) {
        console.error("Error occurred while checking login status:", error);
        // Optionally, you can send an error response to the client
        return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Is logged in:", isLoggedIn);
    console.log("Request body:", req.body);
    // Send a JSON response indicating whether the user is logged in
    res.json({ isLoggedIn });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})