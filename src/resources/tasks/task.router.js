const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.baseUrl.split('/')[2]);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  taskService
    .getTask(req.params.id)
    .then(task => {
      if (!task) {
        res
          .status(404)
          .send('Task not found')
          .end();
      } else {
        res.json(Task.toResponse(task));
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
  taskService
    .postTask(req.baseUrl.split('/')[2], req.body)
    .then(task => {
      if (!task) {
        res
          .status(400)
          .send('Bad request')
          .end();
      } else {
        res.json(Task.toResponse(task));
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
  taskService
    .putTask(req.params.id, req.body)
    .then(task => {
      if (!task) {
        res
          .status(400)
          .send('Task not found')
          .end();
      } else {
        res.json(Task.toResponse(task));
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
  taskService
    .deleteTask(req.params.id)
    .then(task => {
      if (!task) {
        res
          .status(404)
          .send('Task not found')
          .end();
      } else {
        res.json(task.map(Task.toResponse));
      }
    })
    .catch(() => {
      res.status(400).end();
    });
});

module.exports = router;
