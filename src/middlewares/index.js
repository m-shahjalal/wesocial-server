const express = require('express');
const cors = require('cors');

const middlewareList = [
	express.json(),
	express.urlencoded({ extended: true }),
	cors(),
];

const middlewares = (app) => {
	middlewareList.forEach((item) => app.use(item));
};

module.exports = middlewares;
