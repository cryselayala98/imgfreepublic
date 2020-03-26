/* se almacena la info relacionada a la imagen */

const mongoose = require('mongoose');

/* crear un esquema de un cierto tipo de dato */
const { Schema } = mongoose ; 

const path = require('path');

/* timestamp -> cuando se almaceno la img */
const ImageSchema = new Schema ({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default:0 },
    likes: { type: Number, default:0 },
    timestamp:{ type: Date, default: Date.now }
})

/* crear una variable virtual para sacar el filename sin la extension de la imagen (eso con uniqueId)*/
/* el metodo extname de path-> extrae el tipo deextension del archivo */
/*this-> es el ImageSchema*/
ImageSchema.virtual('uniqueId')
    .get(function(){ /* puede ser get(para obtener) o set(para establecer) */
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model ('Image', ImageSchema);