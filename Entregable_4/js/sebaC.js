//-------------sec4-----------



const scroll_sec4 = document.getElementById("img_sec4");

let seccion4 = document.querySelector('.section4');
let images = document.querySelectorAll('.img_sec4');
let parrafos = document.querySelectorAll('.parrafo');
let imagenActual = 0;

const threshold = 10;
let cambioEnProgreso = false; // Bandera para evitar superposiciones

window.addEventListener('scroll', () => {
    if (y >= 4103 && y < 10144) {
        let n = Math.floor((y - 3783) / 600)

       

        for (let index = 0; index < images.length; index++) {
            if (index != n) {
                images[index].classList.remove("oculto")
            } else {
                images[index].classList.add("oculto")
              
            }
        }
    }})



//window.addEventListener('scroll', mostrarScroll);