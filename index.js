var express = require('express');
var mysql = require('mysql');

var app = express();
const path = require('path')
const PORT = process.env.PORT || 5000;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'DroidTechKnow'
});

app.use(express.static(path.join(__dirname, 'public')));
  
app.get('/', (req, res)=>{
    getAllArticleList().then((data)=>{
        res.send(data);
    });
    // res.sendFile(path.join(__dirname + '/public/static/index.html'));
})

function getAllArticleList() {
    var promise = new Promise((resolve, reject)=>{
        connection.query('SELECT * from article', (error, results, fields)=> {
            if (error) reject(error);
            resolve(results);
        });
    });
    return promise;
}

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))