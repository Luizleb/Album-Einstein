var express = require('express');
var config = require('./server/config');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/einstein');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected.');
})

app.set('port', 5000);

app.listen(app.get('port'), function(){
    console.log('Server running on port ' + app.get('port'));
});

config(app);
