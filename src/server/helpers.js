/* este archivo contiene funciones que se van a reutilizar en las vistas */
const moment = require('moment');

const helpers = {};

/* crear una funcion que muestre el formato de la fecha de tal forma que sea entendida por tdos los usuarios */

/* el formato de la funcion-> una version moderna de ecmascript 5 */
helpers.hallar_cnt_tiempo = (timestamp) => {
    /* retornar en minutos hace cuanto se publico la img */
    return moment(timestamp).startOf('minute').fromNow();
}


module.exports = helpers;