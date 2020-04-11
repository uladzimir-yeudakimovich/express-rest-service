const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const { responseToClient } = require('../../helpers/errors-handling');

router.route('/').get(async (req, res) => {
  await responseToClient(usersService.getAll(), req, res, User);
});

router.route('/:id').get(async (req, res) => {
  await responseToClient(usersService.getUser(req.params.id), req, res, User);
});

router.route('/').post(async (req, res) => {
  await responseToClient(usersService.postUser(req.body), req, res, User);
});

router.route('/:id').put(async (req, res) => {
  await responseToClient(
    usersService.putUser(req.params.id, req.body),
    req,
    res,
    User
  );
});

router.route('/:id').delete(async (req, res) => {
  await responseToClient(
    usersService.deleteUser(req.params.id),
    req,
    res,
    User
  );
});

module.exports = router;
