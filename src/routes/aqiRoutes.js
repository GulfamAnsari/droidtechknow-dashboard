var aqiRoutes = require('express').Router();
var AqiController = require('../controllers/aqiController/aqiController');
var aqiController = new AqiController()

aqiRoutes.route('/get-aqi-information').post((req, res) => {
    aqiController.fetchAqiInformation(req, res).then((data) => {
        res.send(data);
    }, (err) => {
        res.status(err.statusCode).send(err);
    });
});

aqiRoutes.route('/get-aqi-pollutants-information').post((req, res) => {
    aqiController.fetchPollutantsInformation(req, res).then((data) => {
        res.send(data);
    }, (err) => {
        res.status(err.statusCode).send(err);
    });
});

module.exports = aqiRoutes;