let mongoose = require('mongoose');

let noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    post_date:{
        type: Date,
        required: true
    }
});

let Note = module.exports = mongoose.model('Note', noteSchema);