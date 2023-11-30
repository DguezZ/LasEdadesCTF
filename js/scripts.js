/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

// Scripts

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

    // Variable global para el porcentaje total
    var porcentajeTotal = 0;

    document.getElementById('ComprobarPrehistoria').addEventListener('click', () => comprobarCoordenada('latitudInput1', 2, 'altitudInput1', 2, 'Venus'));
    document.getElementById('ComprobarAntigua').addEventListener('click', () => comprobarCoordenada('latitudInput2', 2, 'altitudInput2', 2, 'Guiza'));
    document.getElementById('ComprobarMedia').addEventListener('click', () => comprobarCoordenada('latitudInput3', 2, 'altitudInput3', 2, 'Colon'));
    document.getElementById('ComprobarSecreto').addEventListener('click', () => comprobarSecreto('secretInput', 'ramon', 'Mona'));

    function comprobarCoordenada(latitudInputId, latitudCorrecta, altitudInputId, altitudCorrecta, elementId) {
        var latitud = parseFloat(document.getElementById(latitudInputId).value);
        var altitud = parseFloat(document.getElementById(altitudInputId).value);

        if (!isNaN(latitud) && !isNaN(altitud) && latitud === latitudCorrecta && altitud === altitudCorrecta) {
            alert(`¡Coordenadas correctas (Latitud: ${latitud}, Altitud: ${altitud})!`);

            var elemento = document.getElementById(elementId);
            if (elemento) {
                elemento.innerHTML = `<span class="badge badge-recuperada">Recuperada</span> ${elementId}`;
                localStorage.setItem(`${elementId}Status`, 'Recuperada');
                sumarPorcentaje(20); // Sumar 20% al porcentaje total
            }
        } else if (!isNaN(latitud) && !isNaN(altitud) && latitud === latitudCorrecta) {
            alert(`¡Altitud incorrecta! (Latitud: ${latitud}, Altitud: ${altitud})!`);
        } else if (!isNaN(latitud) && !isNaN(altitud) && altitud === altitudCorrecta) {
            alert(`¡Altitud incorrecta! (Latitud: ${latitud}, Altitud: ${altitud})!`);
        } else {
            alert(`Coordenadas incorrectas (Latitud: ${latitud}, Altitud: ${altitud}). Inténtalo de nuevo.`);
        }
    }

    function comprobarSecreto(secretInput, secretocorrecto, elementId) {
        var secreto = document.getElementById(secretInput).value;

        var storedStatus = localStorage.getItem(`${elementId}Status`) || 'Desaparecida';

        if (secreto === secretocorrecto) {
            alert(`¡Secreto correcto (Secreto: ${secreto})!`);

            var elemento = document.getElementById(elementId);
            if (elemento) {
                elemento.innerHTML = `<span class="badge badge-recuperada">Recuperada</span> ${elementId}`;
                localStorage.setItem(`${elementId}Status`, 'Recuperada');
                localStorage.setItem(`${elementId}Acierto`, 'true');
                sumarPorcentaje(40); 
            }
        } else {
            alert(`¡Secreto incorrecto (Secreto: ${secreto})!`);
        }
    }

    // Función para sumar porcentaje al total
    function sumarPorcentaje(porcentaje) {
        porcentajeTotal += porcentaje;

        // Actualizar la barra de progreso si es necesario
        actualizarBarraProgreso(porcentajeTotal);
    }

    function actualizarBarraProgreso(porcentajeTotal) {
        var barraProgreso = document.getElementById('barraProgreso');
        if (barraProgreso) {
            barraProgreso.style.width = porcentajeTotal + '%';
            barraProgreso.innerHTML = porcentajeTotal.toFixed(2) + '%';
    
            localStorage.setItem('FormularioPorcentaje', porcentajeTotal.toFixed(2));
        }
    }

    document.getElementById('resolverCasoBtn').addEventListener('click', () => {
        // Obtener el porcentaje almacenado en el localStorage
        var porcentajeTotal = parseFloat(localStorage.getItem('FormularioPorcentaje'));
    
        // Asegurarnos de que porcentajeTotal sea un número válido y no NaN
        porcentajeTotal = isNaN(porcentajeTotal) ? 0 : porcentajeTotal;
    
        // Generar un valor al azar entre 0 y 100
        var valorAlAzar = Math.random() * 100;
    
        console.log('Porcentaje correcto:', porcentajeTotal); // Nuevo console.log
        console.log('Valor al azar:', valorAlAzar);
    
        // Verificar si el porcentaje correcto es mayor que cero y el valor al azar está dentro del porcentaje correcto
        if (porcentajeTotal > 0 && valorAlAzar <= porcentajeTotal) {
            // Redirigir al usuario al video de YouTube
            window.location.href = 'https://www.youtube.com/watch?v=yN6vSHUl_Sk&list=PL-xVUW9dZgbc0c5LeKpfaBzA3H5nOWYYq&ab_channel=M%C3%BAsicaSinCopyright';
            console.log('capturado');
        } else {
            // Redirigir al usuario a gameover.html
            window.location.href = 'https://www.youtube.com/watch?v=H7iZWwogPJY&ab_channel=shawnftyo';
            console.log('escapo');
        }
    });


});
