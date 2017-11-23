var sidebar = require('../helpers/sidebar');
var imageModel = require('../models/image');

var model = {
    images: []
};

module.exports = {
    index: function(req, res){
        // get the documents in database
        imageModel.find({},{},{sort:{timestamp: -1}}, function(err, images) {
            if(err) throw err;
            model.images = images;
            sidebar(model, function(model){
                res.render('index', model);
            });
        });
    }
};

