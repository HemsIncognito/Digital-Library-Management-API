const express = require('express');
const dbConnection = require('./DbConnection')
const userRoute = require("./Routes/users");
const bookRoute = require("./Routes/books");
const env = require('dotenv');

env.config();
dbConnection();

const app = express();
app.use(express.json()); //parse the json 


const PORT = 8081;

app.get("/", (req,res) => {
    res.status(200).json({
        message: "The server is up and running", PORT
    })
})

//This how we call a router 
app.use("/users", userRoute);
app.use("/books", bookRoute);

app.get("*", (req,res) => {
    req.status(400).json({
        message: "This route doesn't exist"
    })
})

app.listen(PORT, () => {
    console.log(`The server is up and running on the PORT ${PORT}`);
})