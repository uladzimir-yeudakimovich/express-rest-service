const app = require('./app');
const logger = require('./helpers/logger');
const { PORT } = require('./common/config');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});
