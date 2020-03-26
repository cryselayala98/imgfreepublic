//biblioteca para conectarse a la base de datos
//mongoose es un orm, permite modelar los datos tambien
const mongoose = require ('mongoose');

const { database } = require('./keys');


/* usar una promesa */
mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    
    .then(db => console.log('DB is connected')) 
    .catch(err => console.error(err));

/* const {database} -> permite acceder solamente a cierta parte de un objeto, en este caso seria a la propiedad database del archivo keys */