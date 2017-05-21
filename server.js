// Package dependency declarations
const express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    exphbs = require("express-handlebars");


// App initialization
const PORT = process.env.PORT || 3333;
const app = express();


// Configure morgan
app.use(logger("dev"));


// Configure BodyParser
app.use(bodyParser.urlencoded({extended: false}));


// Make public dir static
app.use(express.static("./public"));


// Routes
require("./routes/api-routes.js")(app);


// configure handlebars
app.engine("hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set("view engine", "hbs");


// Configure mongoose to utilize ES6 promises
mongoose.Promise = Promise;


// Configure mongoose db locally
mongoose.connect("mongodb://localhost/trumpdump_db");
// Configure mongoose db to heroku
// mongoose.connect('mongodb://heroku_98770c82:vmtnrq2f8kjg4bkd9c6itltltl@ds147711.mlab.com:47711/heroku_98770c82');
const db = mongoose.connection;


// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});


// Successful db login message
db.once("open", function() {
    console.log("Successful db connection.");
});


// Start server listening
app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});
