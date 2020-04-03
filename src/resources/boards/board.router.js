const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoard(req.params.id);
  res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardService.postBoard(req.body);
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.putBoard(req.params.id, req.body);
  res.json(board.map(Board.toResponse)[0]);
});

router.route('/:id').delete(async (req, res) => {
  boardService
    .deleteBoard(req.params.id)
    .then(board => {
      if (!board) {
        res
          .status(404)
          .send('Board not found')
          .end();
      } else {
        res.json(board.map(Board.toResponse));
        // res
        //   .status(204)
        //   .send('The board has been deleted')
        //   .end();
      }
    })
    .catch(() => {
      res.status(400).end();
    });
});

module.exports = router;
