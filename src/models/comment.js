const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {ObjectId} = Schema;

/* ObjectId -> es un tipo de dato que proporciona Schema */
/* gravatar es un servicio de wordpress que permite manejar una imagen del usuario quien comenta, 
usando la imagen de perfil del correo electronico */
const Comment_Schema = new Schema({
    image_id: {type: ObjectId},
    email: {type: String},
    name: {type: String},
    gravatar: {type: String},
    comment: {type: String},
    timestamp: {type: Date, default: Date.now}
});

/* la propiedad virtual no se guarda en la bd */
/* una propiedad virtual que asocie la informacion de la imagen relacionada al comentario */
Comment_Schema.virtual('imagen_asociada')
    .set(function(image){ /* puede ser get(para obtener) o set(para establecer) */
        this._image = image;
    
    })
    .get(function(){
        return this._image
    });

module.exports =  mongoose.model('Comment', Comment_Schema);