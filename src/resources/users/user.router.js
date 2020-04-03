const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  usersService
    .getUser(req.params.id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .send('User not found')
          .end();
      } else {
        res.json(User.toResponse(user));
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
  usersService
    .postUser(req.body)
    .then(user => {
      if (!user) {
        res
          .status(400)
          .send('Bad request')
          .end();
      } else {
        res.json(User.toResponse(user));
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
  usersService
    .putUser(req.params.id, req.body)
    .then(user => {
      if (!user) {
        res
          .status(400)
          .send('Bad request')
          .end();
      } else {
        res.json(User.toResponse(user));
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
  usersService
    .deleteUser(req.params.id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .send('User not found')
          .end();
      } else {
        res.json(user.map(User.toResponse));
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
