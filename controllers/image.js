var fs = require("fs");
var path = require("path");

module.exports = {
    index: function(req, res) {
        res.redirect('/');
        console.log(req.files[0].filename);
    }
}

