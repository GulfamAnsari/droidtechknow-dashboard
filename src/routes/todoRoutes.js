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

/**
 * Fetches the list of all todos
 */
todoRoutes.route('/todo-list').get((req, res) => {
  mongoDBConnectController.connectMongoDB().then((db) => {
    databaseController.getTodo(req, res, db).then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
    });
  }, (err) => {
    console.log(err);
  });
});

/**
 * Used to add, edit and delete the todos list by updating the existing one
 */
todoRoutes.route('/todo-update').post((req, res, db) => {
  mongoDBConnectController.connectMongoDB().then((db) => {
    databaseController.addTodo(req, res, db).then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
    });
  }, (err) => {
    console.log(err);
  });
});

module.exports = todoRoutes;