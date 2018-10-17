const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config').auth;

const AuthController = require('../Controllers/AuthController');

const configJwt = {
	jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  	secretOrKey : config.secret
}

passport.use(new LocalStrategy(config.basic, AuthController.authLocal));

passport.use(new JwtStrategy(configJwt, AuthController.authToken));

module.exports = { passport, config };