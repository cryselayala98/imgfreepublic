$('#formulario-comentar').hide();

$('#desplegar-form-comentar').click(evento =>{
    
    evento.preventDefault();
    $('#formulario-comentar').slideToggle();
});

$('#btn-like').click(function(evento){
    
    evento.preventDefault();
    
    let image_filename = $(this).data('id');
    
    $.post('/images/' + image_filename + '/like')
        .done(data =>{
            $('.contando-likes').text(data.likes);
        });
});

$('#btn-delete-image').click(function(evento){
    evento.preventDefault();

    let $image = $(this);

    const response = confirm('¿Está seguro de eliminar esa imagen?');
    if(response){
        let image_id = $image.data('id');

        $.ajax({
            url: '/images/' + image_id,
            type: 'DELETE' 
        })
        .done(function(result){
            $image.removeClass('btn-danger').addClass('btn-success');

            $image.find('i').removeClass('fa-trash').addClass('fa-check');

            document.getElementById('btn-delete-image').innerHTML = '';
            $image.append('<span>Imagen Eliminada</span>');
        })
    }
});