module.exports = {
    newest: function(){
        var comments = [
            {
                imageId:        1,
                email:          'luizleb@gmail.com',
                name:           'Leb001',
                gravatar:       'http://lorempixel.com/75/75/animals/1',
                comment:        'This is a test comment.',
                timestamp:      Date.now(),
                image: {
                    uniqueId:       1,
                    title:          'Sample Image 1',
                    description:    'Image 1 description',
                    filename:       'image1.jpg',
                    views:          0,
                    likes:          0,
                    timestamp:      Date.now()  
                }
            }, {
                imageId:        1,
                email:          'deb@gmail.com',
                name:           'Deb',
                gravatar:       'http://lorempixel.com/75/75/animals/2',
                comment:        'This is another test comment.',
                timestamp:      Date.now(),
                image: {
                    uniqueId:       1,
                    title:          'Sample Image 1',
                    description:    'Image 1 description',
                    filename:       'image1.jpg',
                    views:          0,
                    likes:          0,
                    timestamp:      Date.now()  
                }
            }
        ];
        return comments;
    }
};