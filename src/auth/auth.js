const strategy = require('./Strategy');

const auth = (passport) => {
	passport.use('signup', strategy.signup);
	passport.use('login', strategy.login);
	passport.use(strategy.jwt);
};

module.exports = auth;
