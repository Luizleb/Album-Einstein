var fs = require("fs");
var path = require("path");
var sidebar = require('../helpers/sidebar');
var Model = require('../models');
var md5 = require('md5');

var model = {
    image: {}, 
    comments: []
};

module.exports = {
    index: function(req, res) {
        var saveImage = function() {
            var tempPath = req.files[0].path;
            var ext = path.extname(req.files[0].originalname).toLowerCase();
            var filename = req.files[0].filename;
            var shortName = filename.substring(0,6);
            var targetPath = path.resolve('./public/upload/' + shortName + ext);
            if(ext==='.png' || ext==='.jpg' || ext==='.jpeg' || ext==='gif') {
                fs.rename(tempPath, targetPath, function(err){
                    if(err) throw err;
                    // create a new Image model and populate it
                    var newImage = new Model.Image({
                        title:          req.body.title,
                        description:    req.body.description,
                        filename:       shortName + ext
                    });
                    newImage.save(function(err, image) {
                        res.redirect('/images/' + image.uniqueId);
                    })
                });
            } else {
                fs.unlink(tempPath, function(err) {
                    if(err) throw err;
                    res.status(500).json({error:'Only image files are allowed.'});
                });
            }
        };
        saveImage();      
    },
    detail: function(req, res) {
        Model.Image.findOne({filename: {$regex: req.params.id}}, function(err, image) {
            if(err) throw err;
            if(image) {
                image.views += 1;
                model.image = image;
                image.save();
                // find all comments for this image
                Model.Comment.find({imageId: image._id},{},{sort: {timestamp:1}}, function(err, comments) {
                    if(err) throw err;
                    if(comments) {
                        model.comments = comments;
                        sidebar(model, function(model){
                            res.render('image', model);
                        });
                    } else {
                        res.redirect('/');
                    }           
                }); 
            }            
        });           
    },
    like: function(req, res) {
        Model.Image.findOne({filename: {$regex: req.params.id}}, function(err, image){
            if(err) throw err;
            if(image) {
                image.likes += 1;
                image.save(function(err){
                    if(err) {
                        res.json(err);
                    } else {
                        res.json({likes: image.likes});
                    }
                });
            }
        });
    },
    comment: function(req, res) {
        Model.Image.findOne({filename: {$regex: req.params.id}}, function(err, image) {
            if(!err && image) {
                var newComment = new Model.Comment({
                    imageId:    image._id,
                    name:       req.body.name,
                    email:      req.body.email,
                    comment:    req.body.comment,
                    gravatar:   md5(req.body.email)
                });
                newComment.save(function(err, comment){
                if(err) throw err;
                res.redirect('/');});//TODO
            } else {
                res.redirect('/');
            }
        });
    }
}

