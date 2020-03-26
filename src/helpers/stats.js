/* mostrar las estadisticas de la pagina */

/* consultar imagenes populares o cnt de imagenes mas populares, o acerca de los comentarios */
/* hay que consultar el model de los comentarios y de las imagenes (BD) */

const { Comment, Image } = require('../models');

async function num_de_imagenes(){
    return await Image.countDocuments();
}

async function num_de_comentarios(){
    return await Comment.countDocuments();
}

/* numero de vistas de todas las imagenes en total */
async function num_vistas_total(){
    
    const images_query = await Image.find();
    if(images_query.length>0){
     /* el metodo aggregate() -> toma un array como parametro y retorna otro arreglo con un objeto adentro */
    const resultado_suma = await Image.aggregate([{$group:{
        _id: '1',
        viewsTotal: {$sum: '$views'} /* views es uno de los atributos del modelo de Image de la BD */
    }}]);

    return resultado_suma[0].viewsTotal;
    }else return 0;

}

/* total de likes en todas las imagenes */
async function total_likes(){

    const images_query = await Image.find();
    if(images_query.length>0){
        const resultado_suma = await Image.aggregate([{$group:{
            _id: '1',
            likesTotal: {$sum: '$likes'} /* views es uno de los atributos del modelo de Image de la BD */
        }}]);
    
         return resultado_suma[0].likesTotal;
    } else return 0;

    
    
}

module.exports = async () => { /* retorna una funcion pa que ejecute las otras funciones de arriba, no es necesario 
                            que se ejecuten una despues de la otra, por eso el uso de Promise.all()*/
    
    /* para ejecutar todas las funciones al mismo tiempo */ 
    /* esto retorna otro arreglo */
    const resultado = await Promise.all([
        num_de_imagenes(),
        num_de_comentarios(),
        num_vistas_total(),
        total_likes()
    ]);

    return {
        numero_de_imagenes: resultado[0],
        numero_de_comentarios: resultado[1],
        total_de_vistas: resultado[2],
        total_de_likes: resultado[3]
    };    

}