var DATABASE_MONGOBD_CRED_OBJECT = require('../../../cred');
var SECRET_KEY = require('../../../cred');
class LoginLogoutController {

    constructor() {
    }

    doLogin(req, res) {
        console.log(req.body);
        var promise = new Promise((resolve, reject) => {
        });
        return promise;
        // 1. Find the submitted username and password
        // 2. If find then call save Session function
        // Send null

        // return JSON.stringify(saveSession(userInfo, expiresIn));
    }

    doSignUp(req, res) {
        return new Promise((resolve, reject) => {

        });
    }

    saveSession(userInfo, expiresIn) {
        const expiresIn = expiresIn ? expiresIn : 60 * 24 * 24; //expire token after 1 minute
        const accessToken = jwt.sign(userInfo, SECRET_KEY, {
            expiresIn: expiresIn
        });
        return { "user": userInfo, "access_token": accessToken, "expires_in": expiresIn };
    }
}

module.exports = LoginLogoutController;


