/* para mostrar la barra lateral de la página en todas las vistas */
/* va a contener algunas estadisticas */

/* importar funciones de los archivos pupular_images, stats y comments que están tambien en la misma carpeta */

/* van a ser modelos de datos */
const Stats = require('./stats');
const Popular_Images = require('./popular_images');
const Comments = require('./comments');

/* agregar los datos de este archivo a los controladores de home e image en sus metodos index */

/*retornar una funcion */
module.exports = async (modelo_de_datos) => {

    const resultados = await Promise.all([
        /* importar el metodo de imagenes populares del archivo Popular_Images*/
        Popular_Images.popular(), /* retorna un arreglo */
        
        /* Stats es en si misma una funcion ya que en el module.exports de ese archivo retorna una funcion y no 
        unas variables */
        Stats(), /* retorna un objeto con 4 variables */

        Comments.comentarios_mas_novedosos() /* retorna un arreglo */
    ]);

    /* agregar una propiedad barra_lateral */
    modelo_de_datos.barra_lateral = {
        popular_images: resultados[0],
        stats: resultados[1],
        comments: resultados[2]
    }

    return modelo_de_datos;
}