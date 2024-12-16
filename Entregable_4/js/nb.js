const section1 = document.getElementById("section1");
const arbol1 = document.getElementById("arbol1");
const arbol2 = document.getElementById("arbol2");
const arbol3 = document.getElementById("arbol3");

const pj1 = document.getElementById("pj1");
const pj2 = document.getElementById("pj2");
const pj3 = document.getElementById("pj3");

const piedra1 = document.getElementById("piedra1");
const piedra2 = document.getElementById("piedra2");
const piedra3 = document.getElementById("piedra3");
const piedra4 = document.getElementById("piedra4");

const arbusto1 = document.getElementById("arbusto1");
const arbusto2 = document.getElementById("arbusto2");
const arbusto3 = document.getElementById("arbusto3");
const arbusto4 = document.getElementById("arbusto4");

//Funcion usada en el parallax del HERO
window.onscroll = function () {
  const y = window.scrollY;

  arbol1.style.transform = `translateX(${y * -0.2}px)`;
  arbol2.style.transform = `translateX(${y * 0.5}px)`;
  arbol3.style.transform = `translateX(${y * 1}px)`;

  pj1.style.transform = `translateY(${y * -0.6}px)`;
  pj2.style.transform = `translateY(${y * -0.8}px)`;
  pj3.style.transform = `translateY(${y * -1}px)`;

  piedra1.style.transform = `translateX(${y * -0.6}px)`;
  piedra2.style.transform = `translateX(${y * 0.6}px)`;
  piedra3.style.transform = `translateX(${y * 0.5}px)`;
  piedra4.style.transform = `translateX(${y * 0.4}px)`;

  arbusto1.style.transform = `translateX(${y * -1}px)`;
  arbusto2.style.transform = `translateX(${y * -0.4}px)`;
  arbusto3.style.transform = `translateX(${y * 0.5}px)`;
  arbusto4.style.transform = `translateX(${y * 1}px)`;
};

//Esta parte maneja el carrousel de la seccion 2

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#carruselFotos img"); //Armo un arreglo con las imagenes del carrousel
  let currentIndex = 0;

  const changeImage = () => {
    images[currentIndex].classList.remove("active"); //Le quito la clase active a la imagen actual

    currentIndex = (currentIndex + 1) % images.length; //Paso a la siguiente imagen del carrousel

    images[currentIndex].classList.add("active"); //Agrego la clase active a la nueva imagen
  };

  images[currentIndex].classList.add("active"); //Le doy la clase active a la imagen actual

  setInterval(changeImage, 3000); //Invoco a changeImage cada 3 segundos
});

//Esta parte maneja el parallax (mouse moving) de la seccion 3

document.addEventListener("mousemove", parallaxMouseMoving);

function parallaxMouseMoving(event) {
  const image = document.querySelector("#parallaxMouseMoving img");

  //Calculo la posición del cursor relativa al centro de la ventana
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  //Obtengo la posicion (x,y) relativa al centro de la pantalla (centeX,centerY)
  const x = (event.clientX - centerX) / centerX;
  const y = (event.clientY - centerY) / centerY;

  //Ajusto la velocidad/intensidad con la que se mueve la imagen
  const moveX = x * -20;
  const moveY = y * -20;

  //Aplico la transformación a la imagen segun lo indicado anteriormente
  //Le doy un escalado leve a la imagen para que no se vean los bordes de esta
  image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
}

//Controlo la animacion del trio de cards de la seccion 2
window.addEventListener('scroll', () => {
  mostrarCardsSecundarias();
  sec5()
});
let video= document.querySelectorAll('.video_yt', 'contenedorVideo')
let pjsec5= document.querySelectorAll('.pj_sec5')
let cards = document.querySelectorAll('.card');

function mostrarCardsSecundarias() {
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.8) { 
      setTimeout(() => {
        card.classList.add('mostrar');
      }, index * 300); // Retraso escalonado
    } else {
      setTimeout(() => {
        card.classList.remove('mostrar');
      }, index * 300);
    }
  });
}


function sec5() {
  const rect = pjsec5.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.8) { 
      setTimeout(() => {
        pjsec5.classList.add('entrada')
        video.classList.add('entrada');
      }, index * 300); // Retraso escalonado
    } else {
      setTimeout(() => {
        video.classList.remove('entrada')
        pjsec5.classList.remove('entrada');
      }, index * 300);
    }
  
}

//Controla el z-index del loader tras terminar su animacion
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector('.container_loader');

  loader.addEventListener('animationend', () => {
    loader.classList.remove('container_loader');
    loader.classList.add('hidden_container_loader');
  });
});


