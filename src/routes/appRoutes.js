var express = require('express');
const path = require('path')
var appRoutes = express.Router();
var DatabaseController = require('../controllers/databaseController');
var databaseController = new DatabaseController();

appRoutes.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/static/index.html'));
})

appRoutes.route('/article-list').get((req, res) => {
  databaseController.getAllArticleList().then((data) => {
    res.send(data);
  });
})

appRoutes.route('/article-delete').post((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.deleteArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
})

appRoutes.route('/article-edit').patch((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.editArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
})

appRoutes.route('/article-add').post((req, res) => {
  if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
    databaseController.addArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
})

appRoutes.route('/admin').get((req, res) => {
  res.render('index', { "user": ["u2", "u5", "u3"] });
})

appRoutes.route('/:id').get((req, res) => {
  var id = req.params.id;
  res.send(id);
})

module.exports = appRoutes;