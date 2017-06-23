var mongoose = require('mongoose');

/*schema for signup database*/
module.exports = mongoose.model('signup', {
    fname: String,
    lname: String,
    username: String,
    password: String,
    email: String
});