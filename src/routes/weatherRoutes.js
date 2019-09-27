var weatherRoutes = require('express').Router();
var WeatherController = require('../controllers/weatherController/weatherController');
var WeatherController = new UserController()

weatherRoutes.route('/get-weather-information').get((req, res) => {
    WeatherController.fetchWeatherInformation(req, res, db).then((data) => {
        db.close();
        res.send(data);
    }, (err) => {
        console.log(err);
    });
})

module.exports = weatherRoutes;