const path = require('path');
const express_handlebars = require ('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes');
const errorHandler = require('errorhandler');

module.exports = (app) => {

    app.set('port', process.env.PORT || 3000);

    app.set('views', path.join(__dirname, '../views')); 
    app.engine('.hbs', express_handlebars({

        defaultLayout: 'main',

        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs', 
        helpers: require('./helpers') 

    }));

    app.set('view engine', '.hbs');

    app.use(morgan('dev'));

    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('ruta_imagen'));

    app.use(express.urlencoded({extended: false}));

    app.use(express.json());

    routes(app);

    app.use('/public', express.static(path.join(__dirname, '../public')));

   if ('development' === app.get('env')){
       app.use(errorHandler);
   }

   
    return app;
}