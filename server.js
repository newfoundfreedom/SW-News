// Package dependency declarations
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');


// App initialization
const PORT = process.env.PORT || 3333;
const app = express();


// Configure morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public dir static
app.use(express.static("./public"));

// Routes
require("./routes/api-routes.js")(app);

// configure handlebars
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set("view engine", "hbs");



// Configure mongoose to utilize ES6 promises
mongoose.Promise = Promise;

// Configure mongoose db
mongoose.connect("mongodb://localhost/swnews_db");
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
