var CRED_OBJECTS = require('../../../cred');
var MongoClient = require('mongodb').MongoClient;

class MongoDBConnectController {
  constructor() { }

  connectMongoDB() {
    var url = "mongodb://localhost:27017/droid";
    // need to double encode username and password
    // const password = encodeURIComponent(encodeURIComponent(CRED_OBJECTS.MONGO.password));
    // var url = 'mongodb+srv://' + CRED_OBJECTS.MONGO.user + ':' + password + CRED_OBJECTS.MONGO.host;

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },  (err, db)=> {
        if (err) reject(err);
        console.log('mongo db connected');
        resolve(db);
      });
    })
  }
}

module.exports = MongoDBConnectController;

// var a = new MongoDBConnectController();
// a.connectMongoDB();
