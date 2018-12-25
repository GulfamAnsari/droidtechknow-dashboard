var express = require('express');
var mysql = require('mysql');

var app = express();
var port = 4200;
var connection = mysql.createConnection({
    host     : '166.62.6.78',
    user     : 'gulfamansari1515',
    password : 'Gulfam@45683968',
    database: 'DroidTechKnow'
});
app.use(express.static('public'));


app.get('/', (req, res)=>{
    getAllArticleList().then((data)=>{
        res.send(data);
    });
})

function getAllArticleList() {
    var promise = new Promise((resolve, reject)=>{
        connection.connect();
        connection.query('SELECT * from article', (error, results, fields)=> {
            if (error) reject(error);
            resolve(results);
        });
    });
    connection.end();
    return promise;
}

app.listen(port, ()=>{
    console.log('The server is running on port: ' + port);
})