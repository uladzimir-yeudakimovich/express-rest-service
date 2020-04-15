const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

columnSchema.statics.toResponse = column => {
  const { id, title, order } = column;
  return { id, title, order };
};

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
