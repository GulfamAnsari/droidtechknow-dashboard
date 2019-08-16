var DATABASE_MONGOBD_CRED_OBJECT = require('../../../cred');
var MongoClient = require('mongodb').MongoClient;

class MongoDBConnectController {
  constructor() { }

  connectMongoDB() {
    var url = "mongodb://localhost:27017/droid";
    // need to double encode username and password
    // const password = encodeURIComponent(encodeURIComponent(DATABASE_MONGOBD_CRED_OBJECT.password));
    // var url = 'mongodb+srv://' + DATABASE_MONGOBD_CRED_OBJECT.user + ':' + password + DATABASE_MONGOBD_CRED_OBJECT.host;

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },  (err, db)=> {
        if (err) reject(err);
        resolve(db);
      });
    })
  }
}

module.exports = MongoDBConnectController;

// var a = new MongoDBConnectController();
// a.connectMongoDB();
