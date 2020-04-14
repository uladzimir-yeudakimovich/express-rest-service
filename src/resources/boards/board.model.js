const uuid = require('uuid');
const mongoose = require('mongoose');

// const Column = require('../columns/column.model');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: Array
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = user => {
  const { id, title, columns } = user;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

// class Board {
//   constructor({ id = uuid(), title, columns } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns.map(column => new Column(column));
//   }

//   static toResponse(board) {
//     const { id, title, columns } = board;
//     return { id, title, columns };
//   }
// }

module.exports = Board;
