var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'DroidTechKnow'
});

var getData = function getAllArticleList() {
    var promise = new Promise((resolve, reject)=>{
        connection.query('SELECT * from article', (error, results, fields)=> {
            if (error) reject(error);
            resolve(results);
        });
    });
    return promise;
}

module.exports = getData;
