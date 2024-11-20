//-------------sec4-----------



const scroll_sec4 = document.getElementById("img_sec4");

let seccion4 = document.querySelector('.section4');
let images = document.querySelectorAll('.img_sec4');
let parrafos = document.querySelectorAll('.parrafo');
let imagenActual = 0;

const threshold = 10;
let cambioEnProgreso = false; // Bandera para evitar superposiciones

window.addEventListener('scroll', () => {
    let inicioScrollSeccion4 = seccion4.offsetTop - 1000;
    let scrollY = window.scrollY;

    if (scrollY >= inicioScrollSeccion4) {
        let nuevaImagenIndex = imagenActual;

        parrafos.forEach((parrafo, index) => {
            const rect = parrafo.getBoundingClientRect();

            // Ajuste con el umbral
            const visibleTop = rect.top + threshold;
            const visibleBottom = rect.bottom - threshold;

            // Detectar si el párrafo está dentro del rango con el umbral
            if (visibleTop >= 0 && visibleBottom <= window.innerHeight) {
                nuevaImagenIndex = index; // Índice del párrafo visible
            }
        });

        if (imagenActual !== nuevaImagenIndex && !cambioEnProgreso) {
            cambioEnProgreso = true; // Indica que hay un cambio en proceso

            images[imagenActual].classList.remove('oculto'); // Oculta la imagen actual
            setTimeout(() => {
                imagenActual = nuevaImagenIndex; // Actualiza el índice actual

        // Muestra la nueva imagen con animación
        images[nuevaImagenIndex].classList.add('pj_croll');

                cambioEnProgreso = false; // Libera la bandera después de completar el cambio
            }, 400); // Sincroniza con la animación de transición
        }
    }
});



//window.addEventListener('scroll', mostrarScroll);