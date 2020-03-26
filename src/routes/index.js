/* gestion de rutas */

/* importar express para usar funciones de manejo de rutas */
const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

    /* llama a funciones de los controllers */
    
    router.get( '/', home.index);

    /* :image_id captura id de la imagen almacenada para mostrarla mas detalladamente en otra vista*/
    router.get( '/images/:image_id', image.index);

    /* para subir imagenes-> un formulario */
    router.post( '/images', image.create);

    /* poner like a la imagen */
    router.post( '/images/:image_id/like', image.like);

    /* comentar una imagen */
    router.post( '/images/:image_id/comment', image.comment);

    /* eliminar la imagen */
    router.delete( '/images/:image_id', image.remove);

    app.use(router);
};