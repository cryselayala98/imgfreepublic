const controller = {};

const {Image} = require('../models/index');

/* importar el helper de las funciones de Sidebar */
const sidebar = require('../helpers/sidebar');

controller.index = async(req, res) => {

    /* listar todas las imagenes de la mas antigua a la reciente*/
    /* timestamp es uno de los campos de la coleccion Image, es de tipo Date */
    /* 1 ->  ascendente ; -1 -> descendente*/ 
    const images_query = await Image.find().sort({timestamp: -1});

    /* al importar el sidebar no retorna un objeto, sino una funcion que au vez ejecuta otras funciones, 
    entonces necesita ejecutarse y almacenarse en un objeto */
    let modelo_de_datos = {lista_de_imagenes: []};
    /* asignar la consulta de imagenes populares al modelo de datos creado */
    modelo_de_datos.lista_de_imagenes = images_query; 

    /* agregar los datos de la barra lateral al objeto modelo_de_datos */
    modelo_de_datos = await sidebar(modelo_de_datos); 

    //console.log(modelo_de_datos.barra_lateral.comments[0].imagen_asociada);

    res.render('index', modelo_de_datos);
};


/* para que la carpeta de routes pueda hacer uso de este controller */
module.exports = controller;