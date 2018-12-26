var express = require('express');
var appRoutes = express.Router();
var articles = require('../controllers/databaseController');
const path = require('path')

appRoutes.route('/').get((req, res)=>{
    res.sendFile(path.join(__dirname + '../../../public/static/index.html'));
})

appRoutes.route('/article-list').get((req, res)=>{
    articles().then((data)=>{
        res.send(data);
    });
})

appRoutes.route('/admin').get((req, res)=>{
    res.render('index', {"user": ["u2","u5","u3"]});
})

appRoutes.route('/:id').get((req, res)=>{
    var id = req.params.id;
    res.send(id);
})

module.exports = appRoutes;