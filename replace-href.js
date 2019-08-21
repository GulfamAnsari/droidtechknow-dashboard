// This will replace the href in the html file
var fs = require('fs')
var path = require('path');
var file = path.join(__dirname + '/public/react/index.html');
fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/static/g, 'react/static');

  fs.writeFile(file, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
