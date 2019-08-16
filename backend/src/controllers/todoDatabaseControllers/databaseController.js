var DATABASE_MONGOBD_CRED_OBJECT = require('../../../cred');

class DatabaseController {

  constructor() {
    // setInterval(function () {
    //   console.log('recareting connection');
    //   connection.query('SELECT 1');
    // }, 5000);
  }

  getTodo(req, db) {
    const email = 'gulfamansari1515@gmail.com';

    var promise = new Promise((resolve, reject) => {
      var dbo = db.db(DATABASE_MONGOBD_CRED_OBJECT.database);
      dbo.collection("todos").find({}).toArray(function (err, dbResult) {
        if (err) reject(err);
        resolve(dbResult);
        db.close();
      });
    });
    return promise;
  }

  deleteTodo(data) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM article WHERE post=' + data.post, (error, results, fields) => {
        if (error) reject(error);
        resolve(`Post ${data.post} has been successfully deleted`);
      });
    });
  }

  editTodo(data) {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE article SET
                            post=${data['post']}, 
                            articleTitle="${data['articleTitle']}", 
                            articleDescription="${data['articleDescription']}", 
                            articleDate="${data['articleDate']}",
                            catagory="${data['catagory']}", 
                            subCatagory="${data['subCatagory']}", 
                            author="${data['author']}", 
                            views=${data['views']}, 
                            keywords="${data['keywords']}", 
                            articleLink="${data['articleLink']}", 
                            imageLink="${data['imageLink']}",
                            imageLink2="${data['imageLink2']}", 
                            imageAlt="${data['imageAlt']}", 
                            comment=${data['comment']}, 
                            likes=${data['likes']}, 
                            dislikes=${data['dislikes']}
                            WHERE post=${data['post']}`,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(`Post ${data.post} has been successfully Updated`);
        });
    });
  }

  addTodo(req, db) {
    const email = 'gulfamansari1515@gmail.com';
    return new Promise((resolve, reject) => {
      var dbo = db.db(DATABASE_MONGOBD_CRED_OBJECT.database);
      dbo.collection("login").find({}).toArray((err, dbResult) => {
        if (err) reject(err);
        var myquery = { _id: dbResult[i]._id };
        var newvalues = { $set: { tasks: req.body.tasks } };
        dbo.collection("todos").update(myquery, newvalues, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    })
  }

}

module.exports = DatabaseController;


