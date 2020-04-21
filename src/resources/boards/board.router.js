const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const Board = require('./board.model');
const boardService = require('./board.service');
const responseToClient = require('../../helpers/response-to-client');

router.route('/').get(async (req, res, next) => {
  await responseToClient(boardService.getAll(), req, res, Board, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(boardService.getBoard(id), req, res, Board, next);
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  if (!body.title || !body.columns) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(boardService.postBoard(body), req, res, Board, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (!body.title || !body.columns) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(
    boardService.putBoard(id, body),
    req,
    res,
    Board,
    next
  );
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(boardService.deleteBoard(id), req, res, Board, next);
});

module.exports = router;
