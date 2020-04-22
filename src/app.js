const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { logRequest, logErrors } = require('./helpers/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const {
  clientErrorHandler,
  errorHandler
} = require('./helpers/errors-handling');

const checkToken = require('./helpers/check-token');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequest);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:id/tasks', checkToken, taskRouter);
app.use('/login', loginRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = app;
