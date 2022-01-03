const express = require('express');
const cors = require('cors');
const passport = require('passport');
const auth = require('../auth/auth');

const middlewareList = [
	express.json(),
	express.urlencoded({ extended: true }),
	cors(),
];

const middlewares = (app) => {
	middlewareList.forEach((item) => app.use(item));
	auth(passport);
};

module.exports = middlewares;
