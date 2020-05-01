const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const columnSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: String,
    order: Number
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

const Column = model('Column', columnSchema);

module.exports = Column;
