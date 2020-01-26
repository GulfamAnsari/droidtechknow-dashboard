var express = require('express');
const path = require('path');
var nodemailer = require('nodemailer');
var CRED_OBJECTS = require('../../cred');
var droidRoutes = express.Router();
var DatabaseController = require('../controllers/droidDatabaseControllers/databaseController');
var databaseController = new DatabaseController();

droidRoutes.route('/article-list').get((req, res) => {
  databaseController.getAllArticleList().then((data) => {
    res.send(data);
  }, (err) => {
    res.status(400).send(err.sqlMessage);
  });
});

droidRoutes.route('/article-delete').post((req, res) => {
  if (CRED_OBJECTS.MYSQL.user === req.body.username && CRED_OBJECTS.MYSQL.password === req.body.password) {
    databaseController.deleteArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

droidRoutes.route('/article-edit').patch((req, res) => {
  console.log('##############');
  console.log(CRED_OBJECTS.MYSQL);
  console.log(req.body);
  if (CRED_OBJECTS.MYSQL.user === req.body.username && CRED_OBJECTS.MYSQL.password === req.body.password) {
    databaseController.editArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

droidRoutes.route('/article-add').post((req, res) => {
  console.log('##############');
  console.log(CRED_OBJECTS.MYSQL);
  console.log(req.body);
  if (CRED_OBJECTS.MYSQL.user === req.body.username && CRED_OBJECTS.MYSQL.password === req.body.password) {
    databaseController.addArticle(req.body.article).then((success) => {
      res.send(success);
    }, (err) => {
      res.status(400).send(err.sqlMessage);
    });
  } else {
    res.status(401).send('You does not enough permission to delete the article');
  }
});

droidRoutes.route('/send-query').post((req, res) => {
  var senderEmail = 'contact@droidtechnow.com';
  let transporter = nodemailer.createTransport({
    host: process.env.EMAILSERVER,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'contact@droidtechknow.com',
      pass: process.env.PASSWORD // m@4
    }
  });

  var mailOptions = {
    from: senderEmail,
    to: req.body.email,
    subject: 'From DroidTechKnow Dashboard' + 'Subject: ' + req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send({
        message: 'Error while sending Email.'
      });
    } else {
      res.send({
        message: 'Successfully sent the email.'
      });
    }
  });
});

droidRoutes.route('/*').get((req, res) => {
  res.sendFile(path.join(__dirname + '../../../public/droid/index.html'));
});

module.exports = droidRoutes;