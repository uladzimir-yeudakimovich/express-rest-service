const connectToDb = require('./db/db');
const app = require('./app');
const { PORT } = require('./common/config');
const { logger } = require('./middleware/logger');

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process.on('uncaughtException', error => {
  logger.error(`captured error: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
  throw reason;
});
