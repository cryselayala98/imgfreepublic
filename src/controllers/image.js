const path = require('path');
const  {generar_nombre_aleatorio} = require('../helpers/libs');
const file_system = require('fs-extra');
const md5 = require('md5'); /* md5 permite convertir texto a un formato md5(hash) */
const {Image, Comment} = require('../models/index');

const sidebar = require('../helpers/sidebar');

const controller = {};

controller.index = async(req, res) =>{

    let modelo_de_datos = { image_detail: {}, comments:{} };

    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image_query){
        image_query.views ++;
        modelo_de_datos.image_detail = image_query;

        await image_query.save();

        const comments_query = await Comment.find({image_id: image_query._id}); modelo_de_datos.comments = comments_query;

        modelo_de_datos = await sidebar(modelo_de_datos);
        
        res.render('image', modelo_de_datos);
    }else{
        res.redirect('/');
    }

};

controller.create = (req, res) =>{
   
 
    const saveImage = async() => {
        const imgname = generar_nombre_aleatorio();

        const images_query = await Image.find({filename: imgname});
        if(images_query.length > 0){
            saveImage(); 
            
        }else{
            const ruta_imagen = req.file.path;
            const extension = path.extname(req.file.originalname).toLowerCase();
            
            const nueva_ruta = path.resolve('src/public/upload/'+imgname+extension);

            if(extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif'){
            await file_system.rename(ruta_imagen, nueva_ruta);

            const newImg = new Image({
                title: req.body.titulo_de_la_imagen,
                description: req.body.descripcion_de_la_imagen,
                filename: imgname + extension
            });
            const imageSaved = await newImg.save();
            res.redirect('/images/'+imgname); 
            }else{
                await file_system.unlink(ruta_imagen);
                res.status(500).json({error:'Solo formatos de imágenes permitidos'});
            }
        }
        
    };
    saveImage();
  
};

controller.like = async(req, res) =>{
    const image_query =  await Image.findOne({filename: {$regex: req.params.image_id}});

    if(image_query){
        image_query.likes++;
        await image_query.save();
        res.json({
            likes: image_query.likes
        });
    }else{
        res.status(500).json({error: 'Internal Error'});
    }
};

controller.comment = async (req, res) =>{
    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    
    if(image_query){
        const new_comment = new Comment({
            name: req.body.nombre_quien_comenta,
            email: req.body.email_quien_comenta,
            comment: req.body.descripcion_comentario
        });

        new_comment.gravatar = md5(new_comment.email);
        new_comment.image_id = image_query._id; 
   
        const comment_saved = new_comment.save();
        res.redirect('/images/'+image_query.uniqueId);
    
    }else{
        res.redirect('/');
    }

};

controller.remove = async(req, res) =>{
    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image_query){

        await file_system.unlink(path.resolve('./src/public/upload/'+image_query.filename));

        await Comment.deleteMany({image_id: image_query._id});

        await image_query.remove();

        res.json(true);
    }
};

module.exports = controller;