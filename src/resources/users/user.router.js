const router = require('express').Router();
const { BAD_REQUEST } = require('http-status-codes');

const User = require('./user.model');
const usersService = require('./user.service');
const { responseToClient } = require('../../helpers/error-hendling');

router.route('/').get(async (req, res) => {
  await responseToClient(usersService.getAll(), req, res, User);
});

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.getUser(req.params.id), req, res, User);
});

router.route('/').post(async (req, res) => {
  if (!req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.postUser(req.body), req, res, User);
});

router.route('/:id').put(async (req, res) => {
  if (!req.params.id || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(
    usersService.putUser(req.params.id, req.body),
    req,
    res,
    User
  );
});

router.route('/:id').delete(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(
    usersService.deleteUser(req.params.id),
    req,
    res,
    User
  );
});

module.exports = router;
