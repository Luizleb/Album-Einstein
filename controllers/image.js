var fs = require("fs");
var path = require("path");

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
    }
}

