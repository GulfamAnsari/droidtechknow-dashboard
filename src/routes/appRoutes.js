var appRoutes = require('express').Router();
var LoginLogoutController = require('../controllers/loginLogoutControllers/loginLogoutController')
var MongoDBConnectController = require('../controllers/mongoDBControllers/mongoDBConnectController');
var mongoDBConnectController = new MongoDBConnectController();
var loginLogoutController = new LoginLogoutController();

appRoutes.route('/').get((req, res) => {
  res.send('login');
})

appRoutes.route('/login').post((req, res) => {
    mongoDBConnectController.connectMongoDB().then((db) => {
        loginLogoutController.doLogin(req, res, db).then((data) => {
            if (data.length === 0) {
                data.push({ message: 'User does not exist. Please check your email and password' })
            }
            db.close();
            res.send(data);
        }, (err) => {
            console.log(err);
        });
    }, (err) => {
        console.log(err);
    });
});

appRoutes.route('/sign-up').post((req, res) => {
    mongoDBConnectController.connectMongoDB().then((db) => {
        loginLogoutController.doSignUp(req, res, db).then((data) => {
            db.close();
            res.send(data);
        }, (err) => {
            console.log(err);
        });
    }, (err) => {
        console.log(err);
    });
});

module.exports = appRoutes;