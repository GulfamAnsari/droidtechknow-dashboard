var CRED_OBJECTS = require('../../../cred');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class LoginLogoutController {

  constructor() {
  }

  doLogin(req, res, db) {
    return new Promise((resolve, reject) => {
      const email = req.body.payload.email;
      const password = req.body.payload.password;
      const remember = req.body.payload.remember ? 30 : 1;
      this.checkUserExistence(email, db).then((dbResult) => {
        if (dbResult.length !== 0 && bcrypt.compareSync(password, dbResult[0].password)) {
          resolve({ existence: true, data: this.saveSession(dbResult[0], remember) });
        } else {
          resolve({ existence: false, message: 'User does not exist. Please check your email and password' });
        }
      });
    });
  }

  doSignUp(req, res, db) {
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      const email = req.body.payload.email;
      this.checkUserExistence(email, db).then((dbResult) => {
        if (dbResult.length === 0) {
          var newUser = this.createNewUser(req.body.payload);
          dbo.collection("login").insertOne(newUser, (err, response) => {
            if (err) reject(err);
            resolve({ existence: false, data: this.saveSession(newUser, 1) });
          });
        } else {
          resolve({ existence: true, message: 'User already exist.' });
        }
      }, err => reject(err));
    });
  }

  checkUserExistence(email, db) {
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      dbo.collection("login").find({ email }).toArray((err, dbResult) => {
        if (err) reject(err);
        resolve(dbResult);
      });
    })
  }

  createNewUser(userData) {
    var userInfo = {
      username: userData.username,
      email: userData.email,
      password: bcrypt.hashSync(userData.password),
      usertype: userData['usertype'],
      time: Date(),
      country: userData.country,
      device: userData.device,
      emailVefiry: false
    }
    return userInfo;
  }

  saveSession(userInfo, remember) {
    const expiresIn = 60 * 24 * 24 * remember;
    const accessToken = jwt.sign(userInfo, CRED_OBJECTS.SECRET_KEY, {
      expiresIn: expiresIn
    });
    return { user: userInfo, access_token: accessToken, expires_in: expiresIn };
  }

  refresh(req, res) {
    // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
    const token = req.headers.token;

    if (!token) {
      return res.status(401).end();
    }

    var payload
    try {
      payload = jwt.verify(token, jwtKey)
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(401).end()
      }
      return res.status(400).end()
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route

    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
      return res.status(400).end()
    }

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    })

    // Set the new token as the users `token` cookie
    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.send()
  }
}

module.exports = LoginLogoutController;


