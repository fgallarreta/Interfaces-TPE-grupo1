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
let anchoTotal = 1236; // ancho total cuanto quiero mover
let rotaciones = 2; // cuantas veces quiero que cambie
let maxPosition = -(anchoTotal * rotaciones); // Posición máxima permitida

// Función para mover el carrusel a la izquierda
prevBtn.addEventListener('click', () => {
    if (pos < 0) {
        pos += anchoTotal;
        cards.style.transform = `translateX(${pos}px)`;
    }
});

// Función para mover el carrusel a la derecha
sigBtn.addEventListener('click', () => {
    if (pos > maxPosition) {
        pos -= anchoTotal;
        cards.style.transform = `translateX(${pos}px)`;
    }
});

// Selecciona todos los carruseles
document.querySelectorAll('.carruselContainerMini').forEach(carousel => {
    let prevBtnMini = carousel.querySelector('.prev-mini');
    let sigBtnMini = carousel.querySelector('.sig-mini');
    let cards_mini = carousel.querySelector('.cards_mini');

    let posMini = 0; // Posición inicial
    let anchoTotalMini = 1145; // ancho total que quiero mover
    let rotacionesMini = 1; // cuántas veces quiero que cambie
    let maxPositionMini = -(anchoTotalMini * rotacionesMini); // Posición máxima permitida

    // Función para mover el carrusel a la izquierda
    prevBtnMini.addEventListener('click', () => {
        if (posMini < 0) {
            posMini += anchoTotalMini;
            cards_mini.style.transform = `translateX(${posMini}px)`;
        }
    });

    // Función para mover el carrusel a la derecha
    sigBtnMini.addEventListener('click', () => {
        if (posMini > maxPositionMini) {
            posMini -= anchoTotalMini;
            cards_mini.style.transform = `translateX(${posMini}px)`;
        }
    });
});

