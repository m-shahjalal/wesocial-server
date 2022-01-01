require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const logger = require('./src/utils/logger');
const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => logger.info(`server listening on port ${port}`));
