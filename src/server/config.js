/*configurar dependencias*/

const path = require('path');
const express_handlebars = require ('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes');
const errorHandler = require('errorhandler');

/* funcion flecha. */
module.exports = (app) => {

    /* settings */
    app.set('port', process.env.PORT || 3000);

    /* conocer donde se encuentra la carpeta views, luego puedo hacer esto-> app.get('views') */
    app.set('views', path.join(__dirname, '../views')); 
    /* path.join -> unir ruta de src con views */

    app.engine('.hbs', express_handlebars({

        /* definir la vista que siempre se cargara */
        defaultLayout: 'main',

        /* indicar que partials y layouts está dentro de la carpeta views*/ 
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs', /* hbs-> la extension de los archivos*/
        helpers: require('./helpers') /* configurar un archivo helpers */

    }));

    app.set('view engine', '.hbs');

    /* middlewares */

    app.use(morgan('dev'));

    /* configurar para almacenamiento de las imagenes que se suben */
    /* .single('ruta_imagen') -> captura input de la img (name= "ruta_imagen" del formulario) */
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('ruta_imagen'));

    /* recibir informacion que proviene de formularios */
    app.use(express.urlencoded({extended: false}));

    /* para manejo de peticiones http por medio de ajax */
    app.use(express.json());

    /* routes */

    /* capturar info del archivo index de la carpeta routes */
    routes(app);

    /* static files -> hacer uso de la carpeta public */
    app.use('/public', express.static(path.join(__dirname, '../public')));

    /* errorhandlers */

   /* uso de errorHandler en modo de desarrollo */
   if ('development' === app.get('env')){
       app.use(errorHandler);
   }

   
    return app;
}