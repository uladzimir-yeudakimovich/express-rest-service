const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    name = 'USER',
    order = 'order',
    description = 'description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId'
  } = {}) {
    this.id = id;
    this.name = name;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, name, order, description, userId, boardId, columnId } = task;
    return { id, name, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
