var fs = require("fs");
var path = require("path");
var sidebar = require('../helpers/sidebar');
var Model = require('../models/image');

var model = {
    image: {
            uniqueId:       1,
            title:          'Sample Image 1',
            description:    'Image 1 description',
            filename:       'image1.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now()  
        }, 
    comments: [
        {
            imageId:        1,
            email:          'luizleb@gmail.com',
            name:           'Leb',
            gravatar:       'http://lorempixel.com/75/75/animals/1',
            comment:        'This is a test comment.',
            timestamp:      Date.now()
        }, {
            imageId:        1,
            email:          'deb@gmail.com',
            name:           'Deb',
            gravatar:       'http://lorempixel.com/75/75/animals/2',
            comment:        'This is another test comment.',
            timestamp:      Date.now()
        }
    ]
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
                    var newImage = new Model({
                        title:          req.body.title,
                        description:    req.body.description,
                        filename:       shortName + ext
                    });
                    newImage.save(function(err, image) {
                        res.redirect('/');
                        //res.redirect('/images/' + image.uniqueId);
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
        sidebar(model, function(model){
            res.render('image', model);
        });
    },
    like: function(req, res) {
        res.json({likes:1});
    }
}

