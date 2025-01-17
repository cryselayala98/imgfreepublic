const { Comment, Image } = require ('../models');

module.exports = {
    async comentarios_mas_novedosos(){
        const comentarios_novedosos = await Comment.find()
            .limit(5)
            .sort({timestamp: -1});
        
        for(const comentario of comentarios_novedosos){
            const image = await Image.findOne({_id: comentario.image_id});

            comentario.imagen_asociada = image;

        }

        return comentarios_novedosos;
    }
}