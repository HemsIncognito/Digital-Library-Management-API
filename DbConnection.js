const mongoose = require('mongoose');

function dbConnection () {
    const DB_URL = process.env.MONGO_URI;
    mongoose.connect(DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, "Trouble connecting to the DB :-( "));
    db.once("open", function(){
        console.log("Connected to DB Successfully")
    })
}

module.exports = dbConnection