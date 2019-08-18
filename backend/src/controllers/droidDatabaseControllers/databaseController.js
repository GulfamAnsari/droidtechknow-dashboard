var mysql = require('mysql');
var CRED_OBJECTS = require('../../../cred');

var connection = mysql.createConnection(CRED_OBJECTS.MYSQL);

connection.connect();

class DatabaseController {

  constructor() {
    // this is on some hack to connect the mysql server again and again
    setInterval(function () {
      console.log('recareting connection');
      connection.query('SELECT 1');
    }, 5000);
  }

  getAllArticleList() {
    var promise = new Promise((resolve, reject) => {
      connection.query('SELECT * from article', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    return promise;
  }

  deleteArticle(data) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM article WHERE post=' + data.post, (error, results, fields) => {
        if (error) reject(error);
        resolve(`Post ${data.post} has been successfully deleted`);
      });
    });
  }

  editArticle(data) {
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

  addArticle(data) {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO article (post, articleTitle, articleDescription, articleDate,catagory, subCatagory, 
                        author, views, keywords, articleLink, imageLink,imageLink2, imageAlt, comment, likes, dislikes) 
                        VALUES (${data['post']}, "${data['articleTitle']}", "${data['articleDescription']}", "${data['articleDate']}",
                        "${data['catagory']}", "${data['subCatagory']}", "${data['author']}", ${data['views']}, "${data['keywords']}", 
                        "${data['articleLink']}", "${data['imageLink']}","${data['imageLink2']}", "${data['imageAlt']}", ${data['comment']}, 
                        ${data['likes']}, ${data['dislikes']})`,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(`Post ${data.post} has been successfully added`);
        });
    });
  }

}

module.exports = DatabaseController;


