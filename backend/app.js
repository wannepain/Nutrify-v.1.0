import express from "express";
import pg from "pg";
import  env  from "dotenv";

const app = express();
const port = process.env.APP_PORT;
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DN_PORT
});
db.connect()

app.get("/user")

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});