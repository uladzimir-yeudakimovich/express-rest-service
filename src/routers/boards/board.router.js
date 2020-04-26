const router = require('express').Router();

const Board = require('../../models/board.model');
const boardService = require('./board.service');
const responseStatus = require('../../response/response-status');
const responseToClient = require('../../response/response-to-client');

router.route('/').get(async (req, res, next) => {
  await responseToClient(boardService.getAll(), req, res, Board, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(boardService.getBoard(id), req, res, Board, next);
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  const { title, columns } = body;
  if (!title || !columns) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(boardService.addBoard(body), req, res, Board, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { title, columns } = body;
  if (!title || !columns) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(
    boardService.editBoard(id, body),
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
