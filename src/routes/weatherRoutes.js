var weatherRoutes = require('express').Router();
var WeatherController = require('../controllers/weatherController/weatherController');
var weatherController = new WeatherController()

weatherRoutes.route('/get-weather-information').post((req, res) => {
    weatherController.fetchWeatherInformation(req, res).then((data) => {
        db.close();
        res.send(data);
    }, (err) => {
        res.status(err.statusCode).send(err);
    });
});

module.exports = weatherRoutes;