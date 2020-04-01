const uuid = require('uuid');
const Column = require('../column/column.model');

class Board {
  constructor({ id = uuid(), title = 'Project', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Column.toResponse(columns);
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
