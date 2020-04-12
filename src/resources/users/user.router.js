const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const responseToClient = require('../../helpers/errors-handling');

router.route('/').get(async (req, res, next) => {
  await responseToClient(usersService.getAll(), req, res, User, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.getUser(id), req, res, User, next);
});

router.route('/').post(async (req, res, next) => {
  await responseToClient(usersService.postUser(req.body), req, res, User, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await responseToClient(usersService.putUser(id, body), req, res, User, next);
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.deleteUser(id), req, res, User, next);
});

module.exports = router;
