const express = require('express');
const db = require('./libs/db');
const error = require('./libs/error');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
db(app);
middlewares(app);
routes(app);
error(app);

module.exports = app;
