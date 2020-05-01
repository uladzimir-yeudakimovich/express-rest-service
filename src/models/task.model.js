const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    order: Number,
    description: { type: String, required: true },
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = model('Task', taskSchema);

module.exports = Task;
