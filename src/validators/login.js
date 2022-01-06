const { body, validationResult } = require('express-validator');

const loginValidator = [
	body('email')
		.exists()
		.withMessage('email is required')
		.isEmail()
		.withMessage('Provide a valid email address')
		.trim()
		.toLowerCase(),
	body('password')
		.isLength({ min: 5, max: 15 })
		.withMessage('Password is required'),

	(req, res, next) => {
		const errorValidation = validationResult(req);
		
		if (!errorValidation.isEmpty()) {
			const error = errorValidation.array()[0]?.msg
			return res.status(400).json({ error:  error});
		}
		return next();
	},
];

module.exports = loginValidator;
