"use strict";

function desplegarMenu() {
    let menu = document.getElementById('menu');
    menu.classList.toggle('open');
}
function desplegarOpcionesUsuario() {
    let opciones = document.getElementById('userOptions');
    opciones.classList.toggle('mostrarOpciones');
}
const progressText = document.getElementById('progress-text');
const loaderContainer = document.getElementById('loader-container');
const content = document.getElementById('content');

let progress = 0;
const totalDuration = 5000; // Duración total de 5 segundos
const intervalDuration = 100; // Intervalo de actualización en milisegundos

const interval = setInterval(() => {
    progress += intervalDuration;
    const percentage = Math.min(Math.floor((progress / totalDuration) * 100), 100);
    progressText.textContent = percentage + '%';

    // Cuando el progreso llega al 100%, se oculta el loader y se muestra el contenido
    if (percentage === 100) {
        clearInterval(interval);
        setTimeout(() => {
        loaderContainer.style.display = 'none'; // Ocultar loader
        content.style.display = 'block';        // Mostrar contenido de la página
    }, 1000);
    }
}, intervalDuration);
