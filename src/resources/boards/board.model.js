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
    columns: {
      type: Array
    }
  },
  { versionKey: false }
);

// boardSchema.statics.create = async board => {
//   const { title, columns } = board;
//   const id = uuid();
//   const newCol = await columns.map(column => new Column(column));
//   return { id, title, columns: newCol };
// };

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
