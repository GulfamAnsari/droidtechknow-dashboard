// all requires and objects
var express = require('express');
var app = express();
var router = require('./src/routes/appRoutes');
var cors = require('cors')

// constant variables
const path = require('path')
const PORT = process.env.PORT || 5000;

// middle ware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// settting the app
app.set('views', './src/views');
app.set('view engine', 'jade');

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))