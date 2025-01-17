const { Comment, Image } = require('../models');

async function num_de_imagenes(){
    return await Image.countDocuments();
}

async function num_de_comentarios(){
    return await Comment.countDocuments();
}

async function num_vistas_total(){
    
    const images_query = await Image.find();
    if(images_query.length>0){
    const resultado_suma = await Image.aggregate([{$group:{
        _id: '1',
        viewsTotal: {$sum: '$views'} 
    }}]);

    return resultado_suma[0].viewsTotal;
    }else return 0;

}

async function total_likes(){

    const images_query = await Image.find();
    if(images_query.length>0){
        const resultado_suma = await Image.aggregate([{$group:{
            _id: '1',
            likesTotal: {$sum: '$likes'} 
        }}]);
    
         return resultado_suma[0].likesTotal;
    } else return 0;

    
    
}

module.exports = async () => { 
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