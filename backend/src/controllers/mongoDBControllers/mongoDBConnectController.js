var DATABASE_MONGOBD_CRED_OBJECT = require('../../../cred');
var MongoClient = require('mongodb').MongoClient;

class MongoDBConnectController {
  constructor() { }

  connectMongoDB(req, res) {
    // need to double encode username and password
    const password = encodeURIComponent(encodeURIComponent(DATABASE_MONGOBD_CRED_OBJECT.password));
    url = 'mongodb+srv://' + DATABASE_MONGOBD_CRED_OBJECT.user + ':' + password + DATABASE_MONGOBD_CRED_OBJECT.host;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log('connected');
      res.send('connected');
    });
  }
}

module.exports = MongoDBConnectController;