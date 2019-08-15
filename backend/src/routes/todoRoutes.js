var express = require('express');
const path = require('path');
var todoRoutes = express.Router();
var DatabaseController = require('../controllers/todoDatabaseControllers/databaseController');
var databaseController = new DatabaseController();

todoRoutes.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/index.html'));
})

todoRoutes.route('/todo-list').get((req, res) => {
  databaseController.getTodo().then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err.sqlMessage);
  });
});

todoRoutes.route('/todo-delete').post((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.deleteTodo(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

todoRoutes.route('/todo-edit').patch((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.editTodo(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

todoRoutes.route('/todo-add').post((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.addTodo(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

module.exports = todoRoutes;