const express = require('express');
const passport = require('passport');
const users = require('../controllers/user');
const singUpValidator = require('../validators/signup');
const loginValidator = require('../validators/login');

const router = express.Router();

router.post(
	'/register',
	singUpValidator,
	passport.authenticate('signup', { session: false }),
	users.createUser
);
router.post('/login', loginValidator, users.login);

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	users.protected
);

module.exports = router;
