const router = require('express').Router();

const User = require('../../models/user.model');
const usersService = require('./user.service');
const responseStatus = require('../../response/response-status');
const responseToClient = require('../../response/response-to-client');

router.route('/').get(async (req, res, next) => {
  await responseToClient(usersService.getAll(), req, res, User, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.getUser(id), req, res, User, next);
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(usersService.addUser(body), req, res, User, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(usersService.editUser(id, body), req, res, User, next);
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(usersService.deleteUser(id), req, res, User, next);
});

module.exports = router;
