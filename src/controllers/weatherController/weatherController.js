var CRED_OBJECTS = require('../../../cred');
var HelperController = require('../helperControllers/helperController');
var helperController = new HelperController();
var OAuth = require('oauth');

var request = new OAuth.OAuth(null, null, null, null, '1.0', null, 'HMAC-SHA1', null, null);

class WeatherController {

    fetchWeatherInformation(req, res, db) {
        return new Promise((resolve, reject) => {
            const { email } = helperController.decoreJWT(req.headers.token);
            const { payload } = req.body;
            const API_KEY = CRED_OBJECTS.WEATHER.API_KEY;
            const LATITUDE = payload.latitude;
            const LONGITUTE = payload.longitude;
            request.get(
                `https://api.darksky.net/forecast/${API_KEY}/${LATITUDE},${LONGITUTE}?units=si`,
                null,
                null,
                (err, data, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ darksky: data });
                    }
                }
            );
        });
    }

}

module.exports = WeatherController;