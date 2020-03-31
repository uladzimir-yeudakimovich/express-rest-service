const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Task', column = 'column' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = column;
  }

  static toResponse(board) {
    const { id, title, column } = board;
    return { id, title, column };
  }
}

module.exports = Board;
