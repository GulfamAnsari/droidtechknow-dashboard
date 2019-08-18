var CRED_OBJECTS = require('../../../cred');
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
      dbo.collection("todos").find({ email }).toArray((err, dbResult) => {
        if (err) reject(err);
        resolve(dbResult);
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
      dbo.collection('todos').find({ email }).toArray((err, dbResult) => {
        if (err) reject(err);
        if (dbResult.length === 0) {
          dbo.collection('login').find({ email }).toArray((err, dbResult) => {
            mongoDBConnectController.insertInto(db, 'todos', { email, tasks, _id: dbResult[0]._id }).then((res) => {
              resolve(res);
            }, err => reject(err));
          });
        } else {
          var newvalues = { $set: { tasks } };
          mongoDBConnectController.updateOne(db, 'todos', { email }, newvalues).then((res) => {
            resolve(res);
          }, err => reject(err));
        }
      });
    })
  }

}

module.exports = DatabaseController;
