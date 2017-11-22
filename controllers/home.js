var model = {
    images: [
        {
            uniqueId:       1,
            title:          'Sample Image 1',
            description:    'Image 1 description',
            filename:       'image1.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now()  
        }, {
            uniqueId:       2,
            title:          'Sample Image 2',
            description:    'Image 2 description',
            filename:       'image2.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now()
        }, {
            uniqueId:       3,
            title:          'Sample Image 3',
            description:    'Image 3 description',
            filename:       'image3.jpg',
            views:          0,
            likes:          0,
            timestamp:      Date.now()
        }

    ]
};

module.exports = {
    index: function(req, res){
        res.render('index', model);
    }
};

