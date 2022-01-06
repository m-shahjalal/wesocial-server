const user = require('./user');
const post = require('./post')

const routes = [
	{
		path: '/users',
		router: user,
	},
	{
		path: '/posts',
		router: post,
	},
	{ path: '/', router: (_req, res) => res.json({ msg: 'hello world' }) },
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.router);
	});
};
