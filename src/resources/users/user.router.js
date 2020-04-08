const router = require('express').Router();
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const User = require('./user.model');
const usersService = require('./user.service');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.getUser(req.params.id), res);
});

router.route('/').post(async (req, res) => {
  if (!req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.postUser(req.body), res);
});

router.route('/:id').put(async (req, res) => {
  if (!req.params.id || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.putUser(req.params.id, req.body), res);
});

router.route('/:id').delete(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(usersService.deleteUser(req.params.id), res);
});

function responseToClient(method, res) {
  method
    .then(user => {
      if (!user) {
        const err = new Error(NOT_FOUND);
        throw err;
      }
      if (Array.isArray(user)) {
        res.json(user.map(User.toResponse));
      } else {
        res.json(User.toResponse(user));
      }
    })
    .catch(err => {
      if (!err.status) {
        err = new Error(INTERNAL_SERVER_ERROR);
      }
      res.status(err.status).send(err.text);
    });
}

module.exports = router;
