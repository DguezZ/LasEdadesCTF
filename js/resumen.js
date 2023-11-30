/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

// custom.js

window.addEventListener('DOMContentLoaded', event => {
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Agrega la comprobación de valores
    document.getElementById('ComprobarPrehistoria').addEventListener('click', () => comprobarCoordenada('latitudInput1', 2, 'altitudInput1', 2, 'Venus'));
    document.getElementById('ComprobarAntigua').addEventListener('click', () => comprobarCoordenada('latitudInput2', 2, 'altitudInput2', 2, 'Guiza'));
    document.getElementById('ComprobarMedia').addEventListener('click', () => comprobarCoordenada('latitudInput3', 2, 'altitudInput3', 2, 'Colon'));
    document.getElementById('ComprobarSecreto').addEventListener('click', () => comprobarSecreto('secretInput', 'ramon','Mona'));
    


    function comprobarCoordenada(latitudInputId, latitudCorrecta, altitudInputId, altitudCorrecta, elementId) {
        var latitud = parseFloat(document.getElementById(latitudInputId).value);
        var altitud = parseFloat(document.getElementById(altitudInputId).value);  

        if (!isNaN(latitud) && !isNaN(altitud) && latitud === latitudCorrecta && altitud === altitudCorrecta) {
            alert(`¡Coordenadas correctas (Latitud: ${latitud}, Altitud: ${altitud})!`);

            var elemento = document.getElementById(elementId);
            if (elemento) {
                elemento.innerHTML = `<span class="badge badge-recuperada">Recuperada</span> ${elementId}`;
                localStorage.setItem(`${elementId}Status`, 'Recuperada');
            }
        } else if(!isNaN(latitud) && !isNaN(altitud) && latitud === latitudCorrecta){
            alert(`¡Altitud incorrecta! (Latitud: ${latitud}, Altitud: ${altitud})!`);
        }else if(!isNaN(latitud) && !isNaN(altitud) && altitud === altitudCorrecta){
            alert(`¡Altitud incorrecta! (Latitud: ${latitud}, Altitud: ${altitud})!`);
        }else {
            alert(`Coordenadas incorrectas (Latitud: ${latitud}, Altitud: ${altitud}). Inténtalo de nuevo.`);
        }
    }

    function comprobarSecreto(secretInput, secretocorrecto, elementId) {
        var secreto = document.getElementById(secretInput).value;  

        var storedStatus = localStorage.getItem(`${elementId}Status`) || 'Desaparecida';

        if (secreto === secretocorrecto ) {
            alert(`¡Secreto correcto (Secreto: ${secreto})!`);

            var elemento = document.getElementById(elementId);
            if (elemento) {
                elemento.innerHTML = `<span class="badge badge-recuperada">Recuperada</span> ${elementId}`;
                localStorage.setItem(`${elementId}Status`, 'Recuperada');
                localStorage.setItem(`${elementId}Acierto`, 'true');
            }
        }else {
            alert(`¡Secreto incorrecto (Secreto: ${secreto})!`);
        }
    }

    function validarFormulario() {
        var campos = document.querySelectorAll('input[type="text"]');
    
        // Verificar si al menos un campo no está vacío
        for (var i = 0; i < campos.length; i++) {
            if (campos[i].value.trim() !== '') {
                return true; // Si al menos un campo no está vacío, retorna true
            }
        }

        return false;
    }

    

    document.querySelector('#EdadContemporanea .btn-outline-primary').addEventListener('click', function () {
        if (validarFormulario()) {
            var totalCampos = 8;
            var camposCorrectos = 0;
    
            // Obtén todos los campos de entrada una vez
            var campos = document.querySelectorAll('input[id^="campo"]');
    
            campos.forEach(function (campo) {   
                var campoId = campo.id;
                var campoNumero = campoId.substring(5); // Extrae el número del campo
                var valorCorrecto = obtenerValorCorrecto(campoNumero);
    
                if (campo.value.trim() === valorCorrecto) {
                    camposCorrectos++;
                }
            });
    
            var porcentajeCorrecto = (camposCorrectos / totalCampos) * 100;
            actualizarBarraProgreso(porcentajeCorrecto);

            localStorage.setItem('FormularioPorcentaje', porcentajeCorrecto.toFixed(2));

        }
    });

    // Objeto para almacenar los valores correctos asociados con los nombres de los campos
    var valoresCorrectos = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
    };

    // Función para obtener el valor correcto basado en el número del campo
    function obtenerValorCorrecto(numeroCampo) {
        return valoresCorrectos[numeroCampo] || '';
    }
    function actualizarBarraProgreso(porcentajeCorrecto) {
        var barraProgreso = document.getElementById('barraProgreso');
        if (barraProgreso) {
            barraProgreso.style.width = porcentajeCorrecto + '%';
            barraProgreso.innerHTML = porcentajeCorrecto.toFixed(2) + '%';
    
            localStorage.setItem('FormularioPorcentaje', porcentajeCorrecto.toFixed(2));
        }
    }

    document.getElementById('resolverCasoBtn').addEventListener('click', () => {
        // Obtener el porcentaje almacenado en el localStorage
        var porcentajeCorrecto = parseFloat(localStorage.getItem('FormularioPorcentaje')) || 0;

        // Verificar si el porcentaje es mayor al 70%
        if (porcentajeCorrecto > 70) {
            // Verificar si todas las obras de arte están recuperadas
            if (
                localStorage.getItem('VenusStatus') === 'Recuperada' &&
                localStorage.getItem('GuizaStatus') === 'Recuperada' &&
                localStorage.getItem('ColonStatus') === 'Recuperada' &&
                localStorage.getItem('MonaStatus') === 'Recuperada'
            ) {
                // Redirigir al usuario al video de YouTube
                window.location.href = 'https://www.youtube.com/watch?v=TUu-xQf3rRM';
            } else {
                // Redirigir al usuario a gameover.html
                window.location.href = 'gameover.html';
            }
        } else {
            // Redirigir al usuario a gameover.html si el porcentaje es menor o igual al 70%
            window.location.href = 'gameover.html';
        }
    });

    

});
