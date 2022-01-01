const user = require('./user')

const routes = [
	{path: '/', router: (_req, res) => res.json({msg: "hello world"}) },
	{
		path: '/users',
		router: user,
	},
];

module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.router);
	});
};
