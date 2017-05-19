// Package dependency declarations
const mongoose = require('mongoose');
// Create Schema class
const Schema = mongoose.Schema;

// Create note schema
var NoteSchema = new Schema({

    title: {
        type: String
    },
    body: {
        type: String
    }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
