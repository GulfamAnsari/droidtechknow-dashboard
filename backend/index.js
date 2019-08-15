// all requires and objects
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require("body-parser");
var router = require('./src/routes/appRoutes');
var droidRoutes = require('./src/routes/droidRoutes');

// constant variables
const path = require('path')
const PORT = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Application Routes
app.use('/', router);
app.use('/droid', droidRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))