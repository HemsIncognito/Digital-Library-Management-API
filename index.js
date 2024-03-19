const express = require('express')

const app = express();

app.use(express.json());

const PORT = 8081;

app.get("/", (req,res) => {
    res.status(200).json({
        message: "The server is up and running in port: ", PORT
    })
})
