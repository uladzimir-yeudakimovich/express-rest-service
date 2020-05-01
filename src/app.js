const express = require('express');
const { serve, setup } = require('swagger-ui-express');
const { join } = require('path');
const YAML = require('yamljs');

const { logRequest, logErrors } = require('./middleware/logger');
const loginRouter = require('./routers/login/login.router');
const checkToken = require('./middleware/check-token');
const userRouter = require('./routers/users/user.router');
const boardRouter = require('./routers/boards/board.router');
const taskRouter = require('./routers/tasks/task.router');
const errorHandler = require('./middleware/errors-handling');

const app = express();
const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', serve, setup(swaggerDocument));
app.use(logRequest);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');
  next();
});

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:id/tasks', checkToken, taskRouter);

app.use(logErrors);
app.use(errorHandler);

module.exports = app;
