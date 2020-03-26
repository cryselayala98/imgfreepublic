/* funcionalidades de las imágenes */
const path = require('path');

/* extraer la funcion (generar_nombre_aleatorio) del archivo libs.js */
const  {generar_nombre_aleatorio} = require('../helpers/libs');
const file_system = require('fs-extra');
const md5 = require('md5'); /* md5 permite convertir texto a un formato md5(hash) */

/* importar el modelo de datos imagen -> extraer el componente imagen del archivo index(models)*/
const {Image, Comment} = require('../models/index');

/* importar el helper de las funciones de Sidebar */
const sidebar = require('../helpers/sidebar');

const controller = {};

/* cargar una imagen con su detalle */
controller.index = async(req, res) =>{

    /* organizar lo que se va a enviar a la vista */
    let modelo_de_datos = { image_detail: {}, comments:{} };

    /* en req.params.image_id -> 'image_id' es sacado de '/images/:image_id' que es lo que recibe de routes */
    //console.log(req.params.image_id);

    /* consultar a la bd sobre la imagen a buscar */
    //const image_query = await Image.findOne({filename: req.params.image_id});
    /* con el filename no se puede consultar ya que este termina en una extension (.png, .jpg..) y el  
    req.params.image_id no contiene el nombre de la extension, entonces se van a usar expresiones regulares
    (se a consultar si los caracteres de req.params.image_id coinciden con una parte del string de filename): */

    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    //console.log(image_query);
   
    /* validar si esa imagen existe, si alguien excribe en la url una image_id que no existe*/
    if(image_query){
        /* actualizar numero de vistas en la bd */
        image_query.views ++;
        modelo_de_datos.image_detail = image_query;

        await image_query.save();

        /* consultar los comentarios de la imagen */
        const comments_query = await Comment.find({image_id: image_query._id}); /* consultar los comentarios de ese image_id */
        modelo_de_datos.comments = comments_query;

        /* agregar los datos de la barra lateral al objeto modelo_de_datos */
        modelo_de_datos = await sidebar(modelo_de_datos);
        
        /* cargar la vista image (esta en views/partials) */
        res.render('image', modelo_de_datos);
    }else{
        res.redirect('/');
    }

};

/*crear imagenes */
controller.create = (req, res) =>{
   
    /* una funcion */
    const saveImage = async() => {
        const imgname = generar_nombre_aleatorio();
        /* req.file -> informacion relacionada con la imagen*/
        //console.log(req.file);

        /* verificar que imgname no se repita en la bd, con una consulta */
        const images_query = await Image.find({filename: imgname});
        if(images_query.length > 0){
            saveImage(); 
            /* con un while esta recursion no seria necesaria y es mas facil jajaj*/
        }else{
            const ruta_imagen = req.file.path;
            /* extraer la extension de la imagen. saber si png, jpg, jpeg, etc */
            const extension = path.extname(req.file.originalname).toLowerCase();
            
            /* el lugar donde ahora se almacenara la imagen obtenida */
            const nueva_ruta = path.resolve('src/public/upload/'+imgname+extension);

            /* validar el tipo de archivo */
            if(extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif'){
                /* mover la imagen de un directorio a otro (quitar la imagen de la carpeta temp)*/
            await file_system.rename(ruta_imagen, nueva_ruta);

            /* crear un obj nuevo que sera almacenado en la bd  */
            /* req.body captura las variables del formulario de html */
            const newImg = new Image({
                title: req.body.titulo_de_la_imagen,
                description: req.body.descripcion_de_la_imagen,
                filename: imgname + extension
            });
            /* usar await porque guardar la img es algo demorado */
            const imageSaved = await newImg.save();
            //console.log(newImg);
            res.redirect('/images/'+imgname); /* esto esta en routes */
            //res.send('Imagen recibida!');
            }else{
                /* eliminar la img de la carpeta temp */
                await file_system.unlink(ruta_imagen);
                /* devolver msg error por ej en json, hay otras formas*/
                res.status(500).json({error:'Solo formatos de imágenes permitidos'});
            }
            //res.send('imagen recibida!');
        }
        
    };
    saveImage();
  
};

/* hacer like a la imagen */
controller.like = async(req, res) =>{
    const image_query =  await Image.findOne({filename: {$regex: req.params.image_id}});

    if(image_query){
        image_query.likes++;
        /* actualizar en la bd la info de la imagen */
        await image_query.save();

        /* enviar el response a la peticion ajax de hacer likes en el archivo scrips.js de public */
        res.json({
            likes: image_query.likes
        });
    }else{
        res.status(500).json({error: 'Internal Error'});
    }
};

/* comentar la imagen */
controller.comment = async (req, res) =>{
    //console.log(req.body);

    /* consultar si la img existe */
    /* req.params.image_id -> sacado de routes (/images/:image_id/comment) */
    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    
    if(image_query){
        /* crear el obj comment con las variables del model */
        const new_comment = new Comment({
            name: req.body.nombre_quien_comenta,
            email: req.body.email_quien_comenta,
            comment: req.body.descripcion_comentario
        });

        /* el gravatar debe estar en formato md5 */
        new_comment.gravatar = md5(new_comment.email);
        new_comment.image_id = image_query._id; //el _id se genera por defecto en mongo cuando guardo un nuevo objeto
   
        //console.log(new_comment);
        
        /* guardar en la bd */
        const comment_saved = new_comment.save();
        // res.send('comentario recibido!');
        res.redirect('/images/'+image_query.uniqueId);
    
    }else{
        res.redirect('/');
    }

};

/* eliminar una imagen */
controller.remove = async(req, res) =>{
    //console.log(req.params.image_id);
    const image_query = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image_query){

        /* eliminar la imagen de la carpeta upload */
        /* unlink remueve un dato a partir de una direccion que se le de */
        await file_system.unlink(path.resolve('./src/public/upload/'+image_query.filename));

        /* eliminar los comentarios de la imagen en la BD*/
        await Comment.deleteMany({image_id: image_query._id});

        /* eliminar la img de la bd */
        await image_query.remove();

        res.json(true);
    }
};

module.exports = controller;