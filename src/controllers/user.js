const user = {};

user.createUser = async (req, res, next) => {
	const { name, email, password } = req.body;
	res.status(201).json({msg: 'this is signin page'})
};

user.login = async (req, res, next) => {
	res.status(200).json({msg: 'this is login page'})
};

module.exports = user;
