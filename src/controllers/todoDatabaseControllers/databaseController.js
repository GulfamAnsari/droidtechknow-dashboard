var CRED_OBJECTS = require('../../../cred');
var COLLECTIONS = require('../constants.controller').MONGO_DB.COLLECTIONS;
var HelperController = require('../helperControllers/helperController');
var MongoDBConnectController = require('../mongoDBControllers/mongoDBConnectController');
var helperController = new HelperController();
var mongoDBConnectController = new MongoDBConnectController();

class DatabaseController {

  constructor() {
  }

  /**
   * Function is used to fetch the list of all todos
   */
  getTodo(req, res, db) {
    const email = helperController.decoreJWT(req.headers.token).email;
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      dbo.collection(COLLECTIONS.TODOS).find({ email }).toArray((err, dbResult) => {
        if (err) reject(err);
        resolve(dbResult[0].tasks);
      });
    });
  }

  /**
   * Function is used to add the todo list or update the existing todo list
   */
  addTodo(req, res, db) {
    const email = helperController.decoreJWT(req.headers.token).email;
    const { tasks } = req.body.payload;
    return new Promise((resolve, reject) => {
      var dbo = db.db(CRED_OBJECTS.database);
      dbo.collection(COLLECTIONS.TODOS).find({ email }).toArray((err, dbResult) => {
        if (err) reject(err);
        if (dbResult.length === 0) {
          dbo.collection(COLLECTIONS.LOGIN).find({ email }).toArray((err, dbResult) => {
            mongoDBConnectController.insertInto(db, COLLECTIONS.TODOS, { email, tasks, _id: dbResult[0]._id }).then((res) => {
              resolve(dbResult[0].tasks);
            }, err => reject(err));
          });
        } else {
          var newvalues = { $set: { tasks } };
          mongoDBConnectController.updateOne(db, COLLECTIONS.TODOS, { email }, newvalues).then((res) => {
            resolve(res);
          }, err => reject(err));
        }
      });
    })
  }

}

module.exports = DatabaseController;
