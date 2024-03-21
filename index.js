const express = require('express');
const {users} = require("./data/users.json"); //importing users.json as users object
const app = express();

app.use(express.json());

const PORT = 8081;

app.get("/", (req,res) => {
    res.status(200).json({
        message: "The server is up and running", PORT
    })
})

app.get("/users", (req,res) => {
    res.status(200).json({
        data: users 
    })
})
app.get("*", (req,res) => {
    res.status(404).json({
        message: "The route does not exist",
    })
})

app.get("")


app.listen(PORT, () => {
    console.log(`The server is up and running on the PORT ${PORT}`);
})