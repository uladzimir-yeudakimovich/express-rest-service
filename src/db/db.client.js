const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');
const allBoards = require('./boards');
const allTasks = require('./tasks');
const allUsers = require('./users');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("We're connected");
    cb();
  });
};

module.exports = { allBoards, allTasks, allUsers, connectToDb };
