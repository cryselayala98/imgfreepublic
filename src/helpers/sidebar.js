const Stats = require('./stats');
const Popular_Images = require('./popular_images');
const Comments = require('./comments');

module.exports = async (modelo_de_datos) => {

    const resultados = await Promise.all([
        Popular_Images.popular(), 
        
        Stats(), 

        Comments.comentarios_mas_novedosos() 
    ]);

    modelo_de_datos.barra_lateral = {
        popular_images: resultados[0],
        stats: resultados[1],
        comments: resultados[2]
    }

    return modelo_de_datos;
}