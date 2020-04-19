const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
    columns: [
      { title: String, order: Number, by: mongoose.Schema.Types.ObjectId }
    ]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
