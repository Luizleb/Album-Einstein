var model = require('../models');
var async = require('async');

module.exports = {
    newest: function(callback) {
        model.Comment.find({},{},{limit: 5, sort:{timestamp: -1}}, function(err, comments){
            var attachImage = function(comment, next){
                model.Image.findOne({_id: comment.imageId}, function(err, image){
                    comment.image = image;
                    next(err);
                });
            };
            async.each(comments, attachImage, function(err){
                if(err) throw err;
                callback(err, comments);
            });
        });
    }
};
