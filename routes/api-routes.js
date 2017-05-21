// Package dependency declarations
const request = require("request");
const cheerio = require("cheerio");
// Model dependency declarations
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

//Routes
module.exports = function (app) {


    app.get("/", function (req, res) {
        res.redirect('/articles')
    });


    // Scrape route
    app.get('/scrape-npr', function (req, res) {
        // Request political section of npr news
        request('http://www.npr.org/sections/politics/', function (error, response, html) {
            // Load page into cheerio
            const $ = cheerio.load(html);

            // For each article on page...
            $('.item').each(function (i, element) {

                // Obtain the title, link & image and save them to variables
                let articleAnchor = $(element).find('.item-info .title a'),
                    title = $(articleAnchor).text(),
                    link = $(articleAnchor).attr('href'),
                    image = $(element).find('.has-image .imagewrap a img').attr('src');

                // If the article title includes 'Trump' then save to db
                if (title.includes('Trump')) {

                    // Create object to hold results
                    let result = {};

                    // Save items found as result properties
                    result.title = title;
                    result.link = link;
                    result.image = image;

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

            // res.send('NPR Scrape Complete');
            res.redirect('/articles');

        });
    });


    // // Scrape route
    // app.get('/scrape-salon', function (req, res) {
    //     // Request political section of npr news
    //     request('http://www.salon.com/', function (error, response, html) {
    //         // Load page into cheerio
    //         const $ = cheerio.load(html);
    //         // For each article on page...
    //         $('article a').each(function (i, element) {
    //
    //             // Obtain the title, link & image and save them to variables
    //                 let title = $(element).attr('title'),
    //                     link = $(element).attr('href'),
    //                     image = $(element).find('img').attr('src');
    //
    //             console.log(title);
    //             console.log(link);
    //             console.log(image);
    //                 // title = $(articleAnchor).text(),
    //                 // image = $(element).find('.has-image .imagewrap a img').attr('src');
    //
    //             // If the article title includes 'Trump' then save to db
    //             // if (title.includes('Trump')) {
    //
    //                 // Create object to hold results
    //                 // let result = {};
    //
    //                 // Save items found as result properties
    //                 // result.title = title;
    //                 // result.link = link;
    //                 // result.image = image;
    //
    //                 // Create db entry utilizing model
    //                 // let entry = new Article(result);
    //
    //                 //Save to db
    //                 // entry.save(function (err, doc) {
    //                 //     if (err) {
    //                 //         console.log(err);
    //                 //     }
    //                 //     else {
    //                 //         console.log(doc);
    //                 //     }
    //                 // }) // end db save
    //             // } // end if
    //         }); //end each
    //
    //         res.send('Salon Scrape Complete')
    //
    //     });
    // });


    // Retrieve and display ALL scraped articles
    app.get('/articles', function (req, res) {

        Article.find({}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.render('index', {articles: doc})
            }
        });
    });


    // Retrieve and display articles that have been bookmarked
    app.get('/bookmarked', function (req, res) {

        Article.find({'bookmarked': true}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                // res.redirect('/articles');
                res.render('bookmarked', {articles: doc})
            }
        });
    });


    // Bookmark an article by setting db bookmarked value to true
    app.post('/bookmark/:id', function (req, res) {

        Article.findOneAndUpdate({'_id': req.params.id}, {$set: {'bookmarked': true}}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.redirect('/articles');
            }
        });
    });


    // Bookmark an article by setting db bookmarked value to true
    app.post('/remove/bookmark/:id', function (req, res) {

        Article.findOneAndUpdate({'_id': req.params.id}, {$set: {'bookmarked': false}}, function (error, doc) {
            if (error) {
                console.log(error);
            }
            else {
                res.redirect('/articles');
            }
        });
    });


    // Grab all notes for selected article
    app.get('/getnotes/:id', function (req, res) {
        Article.findOne({"_id": req.params.id})
            .populate("note")
            .exec(function (error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.json(doc)
                }
            });
    });


    app.post("/savenote/:id", function (req, res) {
        console.log(req.body);
        // Create a new note from captured values
        let newNote = new Note(req.body);
        // Save note to db
        newNote.save(function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                // Use the article id to find and update it's note
                Article.findOneAndUpdate({'_id': req.params.id}, { $push: {'note': doc._id} })
                // Execute the above query
                    .exec(function (err, doc) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.send(doc);
                        }
                    });
            }
        });
    });

};

