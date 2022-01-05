const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');

const strategy = {};

strategy.signup = new localStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	},
	async (req, username, password, done) => {
		try {
			const user = await UserModel.create({
				name: req.body.name,
				email: username,
				password: password,
			});
			return done(null, user);
		} catch (error) {
			console.log(error);
			done(error);
		}
	}
);

strategy.login = new localStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const user = await UserModel.findOne({ email });
			if (!user) return done('Credential false', false);

			const validate = await user.isValidPassword(password);
			if (!validate) return done('Credential false', false);

			return done(null, user, { success: true });
		} catch (error) {
			return done(error);
		}
	}
);

strategy.jwt = new JWTstrategy(
	{
		secretOrKey: process.env.TOKEN_SECRET,
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	},
	async (token, done) => {
		try {
			return done(null, token.user);
		} catch (error) {
			done(error);
		}
	}
);

module.exports = strategy;
