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
        var html = `<table><thead>
        <tr>
          <th>Post</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>`;
        for(var i=0; i< data.length; i++) {
            var articleTitle = data[i]['articleTitle'];
            var post = data[i]['post'];
            var author = data[i]['author'];
            html = html.concat(`<tr><td>${post}</td><td>${articleTitle}</td><td>${author}</td></tr>`)
        }
        html = html.concat("</tbody></table>")
        res.send(html);
    });
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