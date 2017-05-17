// Package dependency declarations
const request = require("request");
const cheerio = require("cheerio");

//Routes
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.send('SW News - coming soon!');
    });

};

