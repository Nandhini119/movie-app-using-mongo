var express = require('express');
var router = express.Router();

module.exports = function(passport){
router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/message.html',
		failureFlash : true
	}));

	
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
	   
		successRedirect: '/index.html',
		failureRedirect: '/signupmessage.html',
		failureFlash : true
	}));
	
return router;
}

