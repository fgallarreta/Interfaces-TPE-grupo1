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
    
  arbol1.style.transform = `translateY(${y * -0.2}px)`;
  arbol2.style.transform = `translateY(${y * -0.2}px)`;
  arbol3.style.transform = `translateY(${y * -1.2}px)`;
  
  pj1.style.transform = `translateY(${y * -0.6}px)`;
  pj2.style.transform = `translateY(${y * -0.8}px)`;
  pj3.style.transform = `translateY(${y * -1}px)`;

  piedra1.style.transform = `translateY(${y * -0.6}px)`;
  piedra2.style.transform = `translateY(${y * -0.6}px)`;
  piedra3.style.transform = `translateY(${y * -0.5}px)`;
  piedra4.style.transform = `translateY(${y * -0.4}px)`;

  arbusto1.style.transform = `translateY(${y * -1}px)`;
  arbusto2.style.transform = `translateY(${y * -0.4}px)`;
  arbusto3.style.transform = `translateY(${y * -1}px)`;
  arbusto4.style.transform = `translateY(${y * -1.5}px)`;

};


const pj_scroll = document.getElementsByClassName("imagenesScroll")



