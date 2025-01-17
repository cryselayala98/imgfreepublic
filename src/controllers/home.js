const controller = {};

const {Image} = require('../models/index');

const sidebar = require('../helpers/sidebar');

controller.index = async(req, res) => {

    const images_query = await Image.find().sort({timestamp: -1});

    let modelo_de_datos = {lista_de_imagenes: []};
    modelo_de_datos.lista_de_imagenes = images_query; 

    modelo_de_datos = await sidebar(modelo_de_datos); 

    res.render('index', modelo_de_datos);
};

module.exports = controller;