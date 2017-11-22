var path = require('path');
var routes = require('./routes');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    routes(app);
    app.use('/assets/',express.static(path.join(__dirname , '../public')));

    // sets the handlebars engine
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
    }).engine);
    app.set('view engine', 'handlebars');
};

