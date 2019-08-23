var CRED_OBJECTS = require('../../../cred');
var MongoClient = require('mongodb').MongoClient;

class MongoDBConnectController {
  constructor() { }

  connectMongoDB() {
    var url = "mongodb://localhost:27017/droid";
    if (CRED_OBJECTS.MONGO.password) {
      // need to double encode username and password
      const password = encodeURIComponent(encodeURIComponent(CRED_OBJECTS.MONGO.password));
      url = 'mongodb+srv://' + CRED_OBJECTS.MONGO.user + ':' + password + CRED_OBJECTS.MONGO.host;
    }

    // var url = "mongodb://localhost:27017/droid";
    // need to double encode username and password
    // const password = encodeURIComponent(encodeURIComponent(CRED_OBJECTS.MONGO.password));
    // var url = 'mongodb+srv://' + CRED_OBJECTS.MONGO.user + ':' + password + CRED_OBJECTS.MONGO.host;

    return new Promise((resolve, reject) => {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) reject(err);
        console.log('mongo db connected');
        resolve(db);
      });
    })
  }

  insertInto(db, collection, data) {
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      dbo.collection(collection).insertOne(data, (err, response) => {
        if (err) reject(err);
        resolve(response);
      });
    })
  }

  updateOne(db, collection, query, newValues) {
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      dbo.collection(collection).updateOne(query, newValues, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = MongoDBConnectController;
