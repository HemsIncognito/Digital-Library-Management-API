const express = require('express')

const app = express();

app.use(express.json());

const PORT = 8081;

app.get("/", (req,res) => {
    res.status(200).json({
        message: "The server is up and running", PORT
    })
})

app.get("*", (req,res) => {
    res.status(404).json({
        message: "The route does not exist",
    })
})



app.listen(PORT, () => {
    console.log(`The server is up and running on the PORT ${PORT}`);
})