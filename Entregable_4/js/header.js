'use strict';
let menu = document.querySelector('.menuHambNB');
let options = document.querySelector('.oculto');
let menuItems = document.querySelector('nav ul');

menu.addEventListener('click', e => {
  menu.classList.toggle('open');
  options.classList.toggle('oculto');
  menuItems.classList.toggle('visible');
});

let prevY = window.scrollY;
let header = document.querySelector('header');
window.addEventListener('scroll', function() {
  if (prevY < window.scrollY) {
    header.classList.add('stickyHeader');
  } else if (window.scrollY == 0) {
    header.classList.remove('stickyHeader');
  }
  prevY = window.scrollY;
});