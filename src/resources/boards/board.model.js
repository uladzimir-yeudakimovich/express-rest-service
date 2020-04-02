const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuid(), title = 'Project', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Column.toResponse(columns);
  }

  static toResponse(board) {
    if (!board) {
      return;
    }
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
