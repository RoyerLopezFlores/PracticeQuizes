const actualizarAlternativasDOM = () =>{
    
    const respuestas = document.querySelectorAll('.respuesta');

    respuestas.forEach(respuesta => {
        respuesta.addEventListener('click', function() {
            respuestas.forEach(r => r.classList.remove('respuesta-seleccionada'));
            respuesta.classList.add('respuesta-seleccionada');
        });
    });
    
    
}