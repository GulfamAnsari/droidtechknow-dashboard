var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USERNAME,
    password : process.env.PASSWORD,
    database: process.env.DATABASE
});

var databaseController = {
    getAllArticle: function getAllArticleList() {
        var promise = new Promise((resolve, reject)=>{
            connection.query('SELECT * from article', (error, results, fields)=> {
                if (error) reject(error);
                resolve(results);
            });
        });
        return promise;
    },
    deleteArticle: function deleteArticle(post) {
        return new Promise((resolve, reject)=>{
            connection.query('DELETE FROM article WHERE post=' + post, (error, results, fields)=> {
                if (error) reject(error);
                resolve(`Post ${post} has been successfully deleted`);
            });
        });
    }
}

module.exports = databaseController;
