"use strict";

//Uso de funciones
cargarLoader();
//Menu---------------------------------------------------------------------------------------------------
function desplegarMenu() {
    let menu = document.getElementById('menu');
    menu.classList.toggle('open');
}
function desplegarOpcionesUsuario() {
    let opciones = document.getElementById('userOptions');
    opciones.classList.toggle('mostrarOpciones');
}
//Loader--------------------------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------------------------
//Carrusel Grande
const carrusel = document.querySelector('.cards');
const cards = document.querySelectorAll('.bigCard');

// Número de cartas
let cantCards = cards.length;


// Función para mover el carrusel a la izquierda
function moverCarruselIzquierda() {
    const primerCard = carrusel.firstElementChild;
    
    carrusel.appendChild(primerCard); // Mueve la primera imagen al final
    primerCard = carrusel.firstElementChild;
    carrusel.style.transition = 'none'; // Desactivar la transición para un cambio instantáneo
    carrusel.style.transform = `translateX(-${100 / cantCards}%)`; // Mover carrusel
    setTimeout(() => {
        carrusel.style.transition = 'transform 0.5s ease-in-out'; // Reactivar la transición
    }, 50);
}

// Función para mover el carrusel a la derecha
function moverCarruselDerecha() {
    const ultimaCard = carrusel.lastElementChild;
    carrusel.insertBefore(ultimaCard, carrusel.firstElementChild); // Mueve la última imagen al principio
    carrusel.style.transition = 'none'; // Desactivar la transición para un cambio instantáneo
    carrusel.style.transform = `translateX(0%)`; // Mover carrusel
    setTimeout(() => {
        carrusel.style.transition = 'transform 0.5s ease-in-out'; // Reactivar la transición
    }, 50);
}

// Asignar los eventos a las flechas
const flechaIzquierda = document.querySelector('.izquierda');
const flechaDerecha = document.querySelector('.derecha');

flechaIzquierda.addEventListener('click', moverCarruselIzquierda);
flechaDerecha.addEventListener('click', moverCarruselDerecha);
//Carrusel Comun-------------------------------------------------------------------------------------------

// Selecciona todos los carruseles
document.querySelectorAll('.carruselComun').forEach(carruselContainer => {
    const carrusel = carruselContainer.querySelector('.cards_mini');
    const prevBtnMini = carruselContainer.querySelector('.prev-mini');
    const sigBtnMini = carruselContainer.querySelector('.sig-mini');

    // Establece la posición inicial del carrusel
    carrusel.style.display = "flex";
    carrusel.style.transition = 'transform 0.5s ease';
    
    // Función para mover el carrusel a la izquierda
    prevBtnMini.addEventListener('click', () => {
        // Desactiva la transición temporalmente para evitar el salto
        carrusel.style.transition = 'none';
        // Mueve la primera tarjeta al final del carrusel
        carrusel.appendChild(carrusel.firstElementChild);
       
        // Mueve el carrusel instantáneamente para que la última tarjeta esté en la posición correcta
        carrusel.style.transform = 'translateX(-100%)';

  // Activa la transición para hacer el desplazamiento suave
            carrusel.style.transition = 'transform 0.5s ease';
            carrusel.style.transform = 'translateX(0)';
        
    });

    // Función para mover el carrusel a la derecha
    sigBtnMini.addEventListener('click', () => {
        // Activa la transición para hacer el desplazamiento suave hacia la izquierda
        carrusel.style.transition = 'transform 0.5s ease';
        carrusel.style.transform = 'translateX(-100%)';
            // Desactiva la transición temporalmente para evitar el salto
            carrusel.style.transition = 'none';
             // Coloca la última tarjeta al principio
        carrusel.insertBefore(carrusel.lastElementChild, carrusel.firstElementChild);
            // Resetea la posición del carrusel a la posición inicial sin transición
            carrusel.style.transform = 'translateX(0)';
    });
});
