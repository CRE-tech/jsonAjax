var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/practice1');
var usersCollection = db.collection('users');
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use('local', new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback: true}, authenticate));
function authenticate(req, email, password, done){
	process.nextTick(function(){
	usersCollection
		.findOne({email: email}, function(err, user) {
			if(!user || !bcrypt.compareSync(password, user.password)) {
				console.log('not found')
				return done(null, false, {
					message: "Email and password combonation is incorrect."
				});
			}
			done(null, user);
			console.log('logged in')
		},done)
		})
}

passport.use("local-register", new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback: true}, register));
function register(req, email, password, done,err){
	usersCollection
		.findOne({email: email}, function(err, user) {
			if(err){

				console.log(err)
			}
			if(user){
				console.log('email already existed, name is ' + email)
				return done(null, false, {
					message: "The email has been used."
				});
			}
			if(password !== req.body.password2){

				console.log(password + '. passwords are not the same')
				return done(null, false, {
					message: "Please confirm your passwords again."
				});
			}
			console.log(req.body)
			const newUser = {
				email: email,
				// username: req.body.nickname,
				password: bcrypt.hashSync(req.body.password)
			}
			usersCollection
				.save(newUser, function(err,ids){
					if(err){
						console.log(err)
					}
					newUser.id = ids[0]
					done(null, newUser)
					console.log('account created.')
				})
		})
		if(err){
			console.log(err)
		}
}

passport.serializeUser(function(user, done){
	done(null, user);

})

passport.deserializeUser(function(id, done){
	usersCollection
		.find({_id : id}, function(err, user) {
			done(null,user)
		},done)
})


