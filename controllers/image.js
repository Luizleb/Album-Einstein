var fs = require("fs");
var path = require("path");

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

function saveimage(oldpath, filename, ext) {
    var shortName = filename.substring(0,6);
    var targetPath = path.resolve('./public/upload/' + shortName + ext);
    fs.rename(oldpath, targetPath, function(err){
        if(err) throw err;
    });
}

module.exports = {
    index: function(req, res) {
        var tempPath = req.files[0].path;
        var ext = path.extname(req.files[0].originalname).toLowerCase();
        var filename = req.files[0].filename;
        if(ext==='.png' || ext==='.jpg' || ext==='.jpeg' || ext==='gif') {
            saveimage(tempPath,filename,ext);
            res.redirect('/');
        } else {
            fs.unlink(tempPath, function(err) {
                if(err) throw err;
                res.status(500).json({error:'Only image files are allowed.'});
            });
        }  
    },
    detail: function(req, res) {
        res.render('image', model);
    }
}

