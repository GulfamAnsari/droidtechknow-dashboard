// all requires and objects
var express = require('express');
var app = express();
var router = require('./src/routes/appRoutes');

// constant variables
const path = require('path')
const PORT = process.env.PORT || 5000;

// middle ware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// settting the app
app.set('views', './src/views');
app.set('view engine', 'jade');

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))