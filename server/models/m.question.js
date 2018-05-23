var mongoose = require('mongoose')
var User = require('./m.user.js')
var Schema = mongoose.Schema

var schema = new mongoose.Schema({
    title: String,
    q: String,
    like: Array,
    dislike: Array,
    comments: Array,
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{
    timestamp: true
}
);
var Question = mongoose.model('Question', schema);

module.exports = Question