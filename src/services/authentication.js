const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET_KEY } = require('../config');

// authenticating email & password
passport.use(new LocalStrategy({usernameField: 'email'},
																				async (email, password, done) => {
	// this is where you authenticate the user
	let user;
	try {
		user = await User.findOne({ email: email })
	} catch(e) {
		return done(e)
	}

	if(!user) return done(null, false, { message: 'Email or password is incorrect.'})
	if(!user.comparePasswords(password)) return done(null, false, { message: 'Email or password is incorrect.'});

	return done(null, user);
}));


const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: SECRET_KEY
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
	let user;
	try {
		user = await User.findOne({ _id: jwtPayload.sub });
	} catch(e) {
		return done(e);
	}

	if(!user) return done(null, false);

	return done(null, user);
}));

// create jwt
const createJWT = (user) => {
	const userID = user._id;
	const jwtToken = jwt.sign({ sub: userID }, SECRET_KEY);
	return jwtToken;
}

module.exports = {
	createJWT
};
