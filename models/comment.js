var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    imageId:        {type: ObjectId},
    email:          {type: String},
    name:           {type: String},
    gravatar:       {type: String},
    comment:        {type: String},
    timestamp:      {type: Date, 'default':Date.now}
});

commentSchema.virtual('image').set(function(image){
    this._image = image;
}).get(function(){
    return this._image;
});

module.exports = mongoose.model('Comment', commentSchema);