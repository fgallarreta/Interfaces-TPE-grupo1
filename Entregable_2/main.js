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

//Carrusel
let prevBtn = document.querySelector('.prev');
let sigBtn = document.querySelector('.sig');
let cards = document.querySelector('.cards');

let pos = 0; // Posición inicial
let cardsWidth = 1180; // Ancho de cada tarjeta
let totalVisibleCards = 4; // Número de tarjetas visibles
let totalCards = document.querySelectorAll('.bigCard').length; // Número total de tarjetas
let maxPosition = -(totalCards - totalVisibleCards) * cardsWidth; // Posición máxima permitida

// Función para mover el carrusel a la izquierda
prevBtn.addEventListener('click', () => {
    if (pos < 0) {
        pos += cardsWidth;
        cards.style.transform = `translateX(${pos}px)`;
    }
});

// Función para mover el carrusel a la derecha
sigBtn.addEventListener('click', () => {
    if (pos > maxPosition) {
        pos -= cardsWidth;
        cards.style.transform = `translateX(${pos}px)`;
    }
});

