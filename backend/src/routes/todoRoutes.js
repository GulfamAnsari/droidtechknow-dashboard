var express = require('express');
const path = require('path');
var todoRoutes = express.Router();
var MongoDBConnectController = require('../controllers/mongoDBControllers/mongoDBConnectController')
var DatabaseController = require('../controllers/todoDatabaseControllers/databaseController');
var databaseController = new DatabaseController();
var mongoDBConnectController = new MongoDBConnectController();

todoRoutes.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/index.html'));
})

todoRoutes.route('/todo-list').get((req, res) => {
  mongoDBConnectController.connectMongoDB().then((db) => {
    databaseController.getTodo(req, db).then((data) => {
      console.log(data);
      res.send(data);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  }, (err) => {
    console.log(err);
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

  mongoDBConnectController.connectMongoDB().then((db) => {
    databaseController.addTodo(req, db).then((data) => {
      console.log(data);
      res.send(data);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  }, (err) => {
    console.log(err);
  });
});

module.exports = todoRoutes;