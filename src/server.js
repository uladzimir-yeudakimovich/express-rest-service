const connectToDb = require('./db/db');
const app = require('./app');
const { PORT } = require('./common/config');

process.on('unhandledRejection', reason => {
  process.emit('uncaughtException', reason);
});

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
