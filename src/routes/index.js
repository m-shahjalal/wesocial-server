const user = require('./user');

const routes = [
	{
		path: '/users',
		router: user,
	},
	{ path: '/', router: (_req, res) => res.json({ msg: 'hello world' }) },
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.router);
	});
};
