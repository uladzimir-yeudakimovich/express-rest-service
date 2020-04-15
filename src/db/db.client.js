const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');
const allBoards = require('./boards');
const allTasks = require('./tasks');
const allUsers = require('./users');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to DB');
    db.dropDatabase();
    User.insertMany(allUsers);
    Board.insertMany(allBoards);
    Task.insertMany(allTasks);
    cb();
  });
};

module.exports = { allBoards, allTasks, allUsers, connectToDb };
