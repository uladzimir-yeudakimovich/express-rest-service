const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' },
    columns: {
      type: [
        { title: String, order: Number, by: mongoose.Schema.Types.ObjectId }
      ],
      required: true
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
