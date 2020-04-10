const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { logger } = require('./helpers/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  const route = req.url.split('/')[1];
  if (route !== 'users' && route !== 'boards') {
    const { url, method, params, body } = req;
    const message = JSON.stringify({ url, method, params, body });
    logger.log('info', message);
  }
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards/:id/tasks', taskRouter);

module.exports = app;
