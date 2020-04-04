const router = require('express').Router();

const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  boardService
    .getBoard(req.params.id)
    .then(board => {
      if (!board) {
        res
          .status(404)
          .send('Board not found')
          .end();
      } else {
        res.json(Board.toResponse(board));
      }
    })
    .catch(() => {
      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

router.route('/').post(async (req, res) => {
  boardService
    .postBoard(req.body)
    .then(board => {
      if (!board) {
        res
          .status(400)
          .send('Bad request')
          .end();
      } else {
        res.json(Board.toResponse(board));
      }
    })
    .catch(() => {
      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

router.route('/:id').put(async (req, res) => {
  boardService
    .putBoard(req.params.id, req.body)
    .then(board => {
      if (!board) {
        res
          .status(400)
          .send('Bad request')
          .end();
      } else {
        res.json(Board.toResponse(board));
      }
    })
    .catch(() => {
      res
        .status(400)
        .send('Bad request')
        .end();
    });
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
      }
    })
    .catch(() => {
      res
        .status(400)
        .send('Bad request')
        .end();
    });
});

module.exports = router;
