const app = require('./app');
const { PORT } = require('./common/config');
const { logger } = require('./helpers/logger');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});
