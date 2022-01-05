const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');
const User = require('../models/User');

module.exports = [
	body('name').exists().withMessage('name is required'),
	body('email')
		.isEmail()
		.withMessage('should enter a valid email address')
		.custom(async (value) => {
			try {
				const user = await User.findOne({ email: value });
				if (user) throw new Error('email already exists');
				return true;
			} catch (error) {
				throw new Error(error.message);
			}
		}),
	body('password')
		.exists()
		.withMessage('password field should not be empty')
		.isLength({ min: 5, max: 64 })
		.withMessage('password should be more then 5 character'),

	body('confirmPassword')
		.exists()
		.withMessage('password field should not be empty')
		.isLength({ min: 5, max: 64 })

		.custom((value, { req }) => {
			const match = value === req.body.password;
			if (!match) throw new Error('password does not match');
			return true;
		}),

	(req, res, next) => {
		var errorValidation = validationResult(req);
		if (!errorValidation.isEmpty()) {
			return res
				.status(400)
				.json(errorValidation.array({ onlyFirstError: true }));
		}
		next();
	},
];
