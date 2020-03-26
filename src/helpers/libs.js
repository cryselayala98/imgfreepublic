/* funciones que se reutilizaran en el resto de la aplicacion (vistas)*/

const helpers = {};

helpers.generar_nombre_aleatorio = () => {

    const possible = 'abcdefghijklmnopuvwxyz0123456789';
    let nombre_aleatorio = 0;
    for(let i = 0; i<6; i++){
        /* un numero aleatorio entre 0 y la longitud de possible */
       nombre_aleatorio += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return nombre_aleatorio;
};

module.exports = helpers;