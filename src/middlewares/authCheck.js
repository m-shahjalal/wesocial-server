const User = require('../models/User');
const { verifyToken } = require('../utils/token');

module.exports = async (req, res, next) => {
	const token =
		(req.headers.authorization &&
			req.headers.authorization.split(' ')[1]) ||
		false;
	if (!token) return res.status(409).json({ error: 'unauthorized user' });
	try {
		const { email } = await verifyToken(token);
		const user = await User.findOne({ email }).select('-password -__v');
		if (!user) {
			return res.status(401).json({ message: 'Please login first' });
		} else {
			req.user = user;
			return next();
		}
	} catch (error) {
		res.status(400).json(error);
	}
};
