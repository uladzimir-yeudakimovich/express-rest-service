const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const User = require('./user.model');
const usersService = require('./user.service');
const responseToClient = require('../../middleware/response-to-client');

router.route('/').get(async (req, res, next) => {
  await responseToClient(usersService.getAll(), req, res, User, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.getUser(id), req, res, User, next);
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.login || !body.password) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(usersService.postUser(body), req, res, User, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (!body.name || !body.login || !body.password) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(usersService.putUser(id, body), req, res, User, next);
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.deleteUser(id), req, res, User, next);
});

module.exports = router;
