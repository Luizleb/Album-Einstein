var express = require('express');
var config = require('./server/config');

var app = express();

app.set('port', 5000);

app.listen(app.get('port'), function(){
    console.log('Server running on port ' + app.get('port'));
});

config(app);
