// Package dependency declarations
const mongoose = require('mongoose');
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const ArticleSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true,
        unique: true
    },
    // link is a required string
    link: {
        type: String,
        required: true
    },
    // link is a required string
    image: {
        type: String,
    },
    bookmarked: {
        type: Boolean,
        default: false,
        required: true
    },
    note: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]

});

// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
