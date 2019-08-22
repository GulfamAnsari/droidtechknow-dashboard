// This will replace /static/ to /react/static
var fs = require('fs')
var path = require('path');

const cssFiles = getFiles(path.join(__dirname + '/public/react/static/css'));
const files = [...cssFiles];

for( file of files) {
  replaceFileContent(file);
}

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function replaceFileContent(file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/\/static\//g, '/react/static/');

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}
