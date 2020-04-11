const router = require('express').Router();

const Board = require('./board.model');
const boardService = require('./board.service');
const { responseToClient } = require('../../helpers/errors-handling');

router.route('/').get(async (req, res) => {
  await responseToClient(boardService.getAll(), req, res, Board);
});

router.route('/:id').get(async (req, res) => {
  await responseToClient(boardService.getBoard(req.params.id), req, res, Board);
});

router.route('/').post(async (req, res) => {
  await responseToClient(boardService.postBoard(req.body), req, res, Board);
});

router.route('/:id').put(async (req, res) => {
  await responseToClient(
    boardService.putBoard(req.params.id, req.body),
    req,
    res,
    Board
  );
});

router.route('/:id').delete(async (req, res) => {
  await responseToClient(
    boardService.deleteBoard(req.params.id),
    req,
    res,
    Board
  );
});

module.exports = router;
