const uuid = require('uuid');
const mongoose = require('mongoose');

const Column = require('../columns/column.model');

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

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  const newColumns = columns.map(Column.toResponse);
  return { id, title, columns: newColumns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
