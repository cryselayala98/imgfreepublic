const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {ObjectId} = Schema;

const Comment_Schema = new Schema({
    image_id: {type: ObjectId},
    email: {type: String},
    name: {type: String},
    gravatar: {type: String},
    comment: {type: String},
    timestamp: {type: Date, default: Date.now}
});

Comment_Schema.virtual('imagen_asociada')
    .set(function(image){ 
        this._image = image;
    
    })
    .get(function(){
        return this._image
    });

module.exports =  mongoose.model('Comment', Comment_Schema);