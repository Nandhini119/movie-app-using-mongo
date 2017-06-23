var express = require('express');
var router = express.Router();

module.exports = function(passport){
router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/message.html',
		failureFlash : true
	}));

/* GET Registration Page */
	/*router.get('/signup', function(req, res){
		res.render('signup',{message: req.flash('message')});
	});*/
	
	router.get('/signup', function(req, res, next) {
  res.render('signup', { message: 'Express' });
});
	
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
	   
		successRedirect: '/index.html',
		failureRedirect: '/signupmessage.html',
		failureFlash : true
	}));
	
return router;
}

