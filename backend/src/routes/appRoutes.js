var express = require('express');
var app = express();
var appRoutes = express.Router();
var LoginLogoutController = require('../controllers/loginLogoutControllers/loginLogoutController')
var loginLogoutController = new LoginLogoutController();


appRoutes.route('/login').post((req, res) => {
    loginLogoutController.doLogin(req, res).then((data) => {
        console.log(data)
        res.send(data);
    }, (err) => {
        res.status(400).send(err.sqlMessage);
    });
});

appRoutes.route('/sign-up').post((req, res) => {
    if (process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
        databaseController.deleteArticle(req.body.article).then((success) => {
            res.send(success);
        }, (err) => {
            res.status(400).send(err.sqlMessage);
        });
    } else {
        res.status(401).send('You does not enough permission to delete the article');
    }
});

module.exports = appRoutes;