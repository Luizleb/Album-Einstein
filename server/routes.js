var express = require('express');
var router = express.Router();
var home = require('../controllers/home');
var image = require('../controllers/image');

module.exports = function(app){
    router.get('/', home.index);
    router.post('/images', image.index);
    app.use(router);
};
