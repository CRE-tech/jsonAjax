var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/practice1');
var usersCollection = db.collection('users');
var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var flash = require("express-flash-messages");


//login page

router.get('/login', function(req, res, next) {
	const flashMessages = res.locals.getMessages();
	console.log('flash', flashMessages)

	if (flashMessages.error) {
		res.render('login', {
			title : 'login',
			showErrors : true,
			errors : flashMessages.error
		})
	} else {
		res.render('login', {
			title: 'login'
		})
	}
})

router.post('/login', passport.authenticate('local',{ 
	successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
	})
)

//register page


router.get('/register', function(req, res, next) {
	const flashMessages = res.locals.getMessages();
	console.log('flash', flashMessages)

	if (flashMessages.error) {
		res.render('register', {
			title : 'registeration',
			showErrors : true,
			errors : flashMessages.error
		})
	} else {
		res.render('register',  {
			title: 'registeration'
		})
	}	
})

router.post('/register', passport.authenticate('local-register', {
	successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
	})
)



module.exports = router;
