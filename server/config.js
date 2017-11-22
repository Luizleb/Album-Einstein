var path = require('path');
var routes = require('./routes');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    app.use(multer({
        dest: path.join(__dirname,'../public/upload/temp')
    }).any());
    routes(app);
    app.use('/assets/',express.static(path.join(__dirname , '../public')));

    // sets the handlebars engine
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
    }).engine);
    app.set('view engine', 'handlebars');
};

