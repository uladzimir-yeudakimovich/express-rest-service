const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res.json(user.map(User.toResponse)[0]);
});

router.route('/').post(async (req, res) => {
  const user = await usersService.postUser(req.body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.putUser(req.params.id, req.body);
  res.json(user.map(User.toResponse)[0]);
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  res.json(user.map(User.toResponse));
});

module.exports = router;
