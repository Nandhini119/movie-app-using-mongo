var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
/*let signupControl = require('../controller/signupcontrol');*/
let loginControl = require('../controller/logincontrol');
let movieSearch = require('../controller/moviecontrol');

module.exports = function(passport)
{
/*route for signup*/
/*router.post('/signup', signupControl.addNewUser);
route for logging in
router.get('/login', loginControl.login);*/
router.get('/logout', loginControl.logout);
/*routes for movies add,delete,search,view*/
router.get('/movie/search', movieSearch.search);
router.post('/movie/add', movieSearch.favourite);
router.get('/movie/view', movieSearch.viewfavourite);
router.get('/movie/delete', movieSearch.delfavourite);

return router;
}