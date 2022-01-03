const passport = require('passport');
const jwt = require('jsonwebtoken');

const user = {};

user.createUser = async (req, res, next) => {
	res.status(201).json({ success: true });
};

user.login = async (req, res, next) => {
	passport.authenticate('login', async (err, user, { success }) => {
		if (!success) return next(err);
		try {
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign(
					{ user: body },
					process.env.TOKEN_SECRET
				);
				return res.json({ name: user.name, email: user.email, token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

user.protected = (req, res, next) => {
	res.json({ message: 'This is protected route' });
};

module.exports = user;
