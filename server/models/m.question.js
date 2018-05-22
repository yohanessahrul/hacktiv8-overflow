var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    title: String,
    q: String,
    like: Array,
    dislike: Array,
    comments: Array,
    author: String
},{
    timestamp: true
}
);
var Question = mongoose.model('Question', schema);

module.exports = Question