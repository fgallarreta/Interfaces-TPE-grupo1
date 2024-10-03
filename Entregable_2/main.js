"use strict";

//Uso de funciones
cargarLoader();

function desplegarMenu() {
    let menu = document.getElementById('menu');
    menu.classList.toggle('open');
}
function desplegarOpcionesUsuario() {
    let opciones = document.getElementById('userOptions');
    opciones.classList.toggle('mostrarOpciones');
}

function cargarLoader() {
    let progreso = document.getElementById('progreso');
    let contenedorLoader = document.getElementById('loader');
    let paginaGral = document.getElementById('paginaGral');

    let inicio = 0;
    let duracion = 5000;
    let intervalo = 100;

    let interval = setInterval(() => {
        inicio += intervalo;
        let porcentaje = Math.min(Math.floor((inicio / duracion) * 100), 100);
        progreso.textContent = porcentaje + '%';

        // Cuando el progreso llega al 100%, se oculta el loader y se muestra el contenido
        if (porcentaje === 100) {
            clearInterval(interval);
            setTimeout(() => {
                contenedorLoader.style.display = 'none'; // Ocultar loader
                paginaGral.style.display = 'block';      // Mostrar contenido de la página
            }, 1000);
        }
    }, intervalo);
};



