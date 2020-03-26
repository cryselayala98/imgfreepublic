/* mostrar las imagenes mas populares */

/* importar el modelo de datos de la imagen */
const { Image } = require('../models');

module.exports = {

    /* asi es mas o menos una estructura de function en ecmascript 6 */
    async popular(){
        /* consultar las 9 imagenes mas populares ordenadas descendentemente */
        const p_images = await Image.find()
            .limit(9)
            .sort({likes: -1});
        
        return p_images;
    }
}