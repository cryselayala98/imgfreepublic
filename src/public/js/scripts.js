/*hacer que por defecto la caja de comentarios este oculta */
$('#formulario-comentar').hide();

/* Mostrar y ocultar la caja de comentarios */
$('#desplegar-form-comentar').click(evento =>{
    
    /* preventDefault -> Cancela el evento si este es cancelable, sin detener el resto del funcionamiento 
    del evento, es decir, puede ser llamado de nuevo. */
    evento.preventDefault();
    /* slideToggle() es una funcion para que oculte y muestre la cajita */
    $('#formulario-comentar').slideToggle();
});

/* hacer que funcionen los likes de una imagen con Ajax(jquery) */
/* seleccionar el boton 'me gusta' con jquery, seleccionando la id del boton */
$('#btn-like').click(function(evento){
    
    /* preventDefault -> Cancela el evento si este es cancelable, sin detener el resto del funcionamiento 
    del evento, es decir, puede ser llamado de nuevo. */
    evento.preventDefault();

    /* capturar el data-id de ese boton, que es el filename de la imagen */
    let image_filename = $(this).data('id');
    
    /* llamar a la funcion de la carpeta routes por post */
    /* done es la respuesta a la peticion */
    $.post('/images/' + image_filename + '/like')
        .done(data =>{
            /* actualizar el numero de likes en la vista por medio de la class 'contando-likes' */
            $('.contando-likes').text(data.likes);
        });
});

/* eliminar una imagen por medio de una peticion Ajax */
$('#btn-delete-image').click(function(evento){
    evento.preventDefault();

    /* capturar el data-id de ese boton, que es el uniqueId de la imagen */
    let $image = $(this);

    /* mostrar una advertencia */
    const response = confirm('¿Está seguro de eliminar esa imagen?');
    if(response){
        let image_id = $image.data('id');

        /* enviar una peticion ajax al servidor, que va a ser de tipo delete y no post */
        $.ajax({
            url: '/images/' + image_id,
            type: 'DELETE' /* Tipo de peticion (get, post, delete ...) */
        })
        .done(function(result){
            //console.log(result);
            /* cambiar el color del boton de eliminar para mostrarle al usiario que ha sido eliminada */
            $image.removeClass('btn-danger').addClass('btn-success');

            /* cambiar el icono */
            $image.find('i').removeClass('fa-trash').addClass('fa-check');

            /* mostrar mensaje que ha sido elinado */
            document.getElementById('btn-delete-image').innerHTML = '';
            $image.append('<span>Imagen Eliminada</span>');
        })
    }
});