// all requires and objects
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require("body-parser");
var router = require('./src/routes/appRoutes');
// var droidRoutes = require('./src/routes/droidRoutes');
var todoRoutes = require('./src/routes/todoRoutes');
var weatherRoutes = require('./src/routes/weatherRoutes');
var aqiRoutes = require('./src/routes/aqiRoutes');

// constant variables
const path = require('path')
const PORT = process.env.PORT || 5000;

// middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Application Routes
// app.use('/droid', droidRoutes);
app.use('/todo', todoRoutes);
app.use('/weather', weatherRoutes);
app.use('/aqi', aqiRoutes);
app.use('/', router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))