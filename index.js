var express = require('express');
var mysql = require('mysql');

var app = express();
const path = require('path')
const PORT = process.env.PORT || 5000;
var connection = mysql.createConnection({
    host     : '166.62.6.78',
    user     : 'gulfamansari1515',
    password : 'Gulfam@45683968',
    database: 'DroidTechKnow'
});

app.use(express.static(path.join(__dirname, 'public')));
  
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

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))