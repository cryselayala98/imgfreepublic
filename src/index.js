/* desde aca se arranca la aplicacion 4:14:25*/

const express = require ('express');

/* se trae la configuracion creada en ese archivo de la carpeta server */ 
const config = require('./server/config'); 

/*express(); -> esto devuelve un objeto, para poder llamarlo, o definir rutas*/

/* se lleva esto para configurarlo en el archivo config.js */
const app = config(express()); 

/*ejecuta lo que sale en el archivo database.js */
require('./database'); 


/* iniciar el servidor */
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

