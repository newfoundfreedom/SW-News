// Package dependency declarations
const request = require("request");
const cheerio = require("cheerio");
// Model dependency declarations
var Article = require("../models/Article.js");

//Routes
module.exports = function (app) {

    // Scrape
    app.get('/scrape', function (req, res) {
        // Request political section of npr news
        request('http://www.npr.org/sections/politics/', function (error, response, html) {
            // Load page into cheerio
            const $ = cheerio.load(html);

            // Save title and image of each article containing 'Trump' in title
            $('.item').each(function (i, element) {

                let articleTitle = $(element).find('.item-info .title a'),
                    title = $(articleTitle).text(),
                    link = $(articleTitle).attr('href'),
                    image = $(element).find('.has-image .imagewrap a img').attr('src');

                if (title.includes('Trump')) {

                    // Create object to hold results
                    let result = {};

                    // Save items found as result properties
                    result.title = title;
                    result.link = link;
                    result.image = image;

                    // console.log(title);
                    // console.log(image);
                    // console.log(link);

                    // Create db entry utilizing model
                    let entry = new Article(result);

                    //Save to db
                    entry.save(function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(doc);
                        }
                    }) // end db save
                } // end if
            }); //end each

            res.send('Scrape Complete')

        });
    });


    app.get("/", function (req, res) {
        res.send('SW News - coming soon!');
    });

};

