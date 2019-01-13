var mysql = require('mysql');
const aws = require('aws-sdk');
console.log('user naem ')
console.log(process.env.USERNAME)
let s3 = new aws.S3({
  username: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});
console.log(s3);
var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USERNAME,
    password : process.env.PASSWORD,
    database: process.env.DATABASE
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
