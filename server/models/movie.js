var mongoose = require('mongoose');

/*schema for movie database*/
module.exports = mongoose.model('movies', {
    title: String,
    poster: String,
    release_date: String,
    email:String
});