/* consultar acerca de los comentarios mas novedosos */

/* importar el modelo de la base de datos de Comment e Image */
const { Comment, Image } = require ('../models');

module.exports = {
    async comentarios_mas_novedosos(){
        /* consultar los 5 comentarios mas populares */
        /* -1 es ordenar de los mas recientes a los antiguos (orden descendente) */
        /* consultar a la BD */
        const comentarios_novedosos = await Comment.find()
            .limit(5)
            .sort({timestamp: -1});
        
        /* consultar la imagen asociada a cada comentario, para en la vista mostrarla  en una miniatura*/

        for(const comentario of comentarios_novedosos){
            const image = await Image.findOne({_id: comentario.image_id});

            /* asociarle un objeto imagen a cada comentario */
            /* agrego una nueva propiedad 'imagen_asociada' */

            /* asigno image a la propiedad virtual 'imagen_asociada', que esta en el modelo Comment de la BD */
            comentario.imagen_asociada = image;

        }

        return comentarios_novedosos;
    }
}