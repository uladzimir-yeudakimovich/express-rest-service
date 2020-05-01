const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'Column' },
    columns: {
      type: [{ title: String, order: Number, by: Schema.Types.ObjectId }],
      required: true
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = model('Board', boardSchema);

module.exports = Board;
