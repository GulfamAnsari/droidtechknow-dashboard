const jwt = require('jsonwebtoken');

class HelperController {
  constructor() { }

  decoreJWT(token) {
    return jwt.decode(token);
  }
}

module.exports = HelperController;
