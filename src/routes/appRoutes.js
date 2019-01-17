var express = require('express');
var appRoutes = express.Router();
var databaseController = require('../controllers/databaseController');
const path = require('path')

appRoutes.route('/').get((req, res)=>{
    res.sendFile(path.join(__dirname + '../../../public/static/index.html'));
})

appRoutes.route('/article-list').get((req, res)=>{
    databaseController.getAllArticle().then((data)=>{
        res.send(data);
    });
})

appRoutes.route('/article-delete').post((req, res)=>{
    if(process.env.USERNAME === req.body.username && process.env.PASSWORD === req.body.password) {
        databaseController.deleteArticle(req.body.id).then((success)=>{
            res.send(success);
        }, (err)=>{
            res.status(400).send(err);
        });
    } else {
        res.status(200).send('You does not enough permission to delete the article');
    }
})

appRoutes.route('/admin').get((req, res)=>{
    res.render('index', {"user": ["u2","u5","u3"]});
})

appRoutes.route('/:id').get((req, res)=>{
    var id = req.params.id;
    res.send(id);
})

module.exports = appRoutes;