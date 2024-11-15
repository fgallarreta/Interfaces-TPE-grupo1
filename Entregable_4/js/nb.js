


window.addEventListener("scroll", hero);

const character1 = document.querySelector(".character_1")
  const character2 = document.querySelector(".character_2")
  const character3 = document.querySelector(".character_3")
  const character4 = document.querySelector(".character_4")
  const character5 = document.querySelector(".character_5")
  
  const tree1 = document.querySelector(".tree_left")
  const tree2 = document.querySelector(".tree_right_1")
  const tree3 = document.querySelector(".tree_right_2")
  
  const rock1 = document.querySelector(".rock_left")
  const rock2 = document.querySelector(".rock_right_1")
  const rock3 = document.querySelector(".rock_right_2")
  const rock4 = document.querySelector(".rock_right_3")
  
  const bush1 = document.querySelector(".bush_left_1")
  const bush2 = document.querySelector(".bush_left_2")
  const bush3 = document.querySelector(".bush_right_1")
  const bush4 = document.querySelector(".bush_right_2")
  
const appExample = document.querySelector(".app_example")
  


function hero() {
    const y = window.scrollY

    document.querySelector("#header").classList.toggle("small", y > 120)

    character1.style.top = 480 - y * 0.4 + "px"
    character2.style.top = 400 - y * 0.7 + "px"
    character3.style.top = 350 - y * 0.3 + "px"

    tree1.style.top = -1 - y * 0.1 + "px"
    tree1.style.left = -160 - y * 0.15 + "px"
    tree2.style.top = 106.71 - y * 0.1 + "px"
    tree2.style.right = -35.24 - y * 0.15 + "px"
    tree3.style.top = 278.38 - y * 0.2 + "px"
    tree3.style.right = -79 - y * 0.1 + "px"
    rock1.style.top = 793.37 - y * 0.15 + "px"
    rock2.style.top = 737.5 - y * 0.1 + "px"
    rock3.style.top = 786.64 - y * 0.2 + "px"
    rock4.style.top = 737.5 - y * 0.15 + "px"
    bush1.style.top = 717.97 - y * 0.12 + "px"
    bush2.style.top = 821.65 - y * 0.3 + "px"
    bush3.style.right = 60.35 - y * 0.2 + "px"
    bush4.style.right = -45.34 - y * 0.15 + "px"

   
    appExample.style.left = 50 + y * 0.2 + "px"

    const maxY = 600
  
    const shadowAlpha = Math.max(0, 0.4 - (Math.min(y, maxY) / maxY) * 0.4)

    shadows.forEach(shadow => {
        shadow.style.background = `rgba(68, 104, 63, ${shadowAlpha})`
        shadow.style.boxShadow = `0 0 10px 10px rgba(68, 104, 63, ${shadowAlpha})`
    })
}


window.addEventListener("resize", setHeightMainPage)

setHeightMainPage()

function setHeightMainPage() {
    const windowWidth = window.innerWidth
    const windorHeigth = window.innerHeight;

    let first = windowWidth * 894 / 1280
    let second = windowWidth * 960 / 1280

    document.querySelector("#sec1").style.height = first + second + "px"

}


//....................scrol de pj SEC4.................
/*
let pj_scroll = document.querySelectorAll(".pj_scroll");


function animarScroll(){
    let scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    for (let i = 0; i< pj_scroll.length; i++){
        let height = pj_scroll[i].offsetTop;
        if(4500 > scrollTop){
            pj_scroll[i].style.opacity = 0;
          
            pj_scroll[i].classList.remove("pj_scroll_right");
        }
        if(height - 200 < scrollTop) {
            pj_scroll[i].style.opacity = 1;
            if(i%2==0){
          
            }
            else{
                pj_scroll[i].classList.add("pj_scroll_right");
            }
        }
        if(height + 6500 < scrollTop){
            pj_scroll[i].style.opacity = 0;
            if(i%2==0){
               
            }
            else{
                pj_scroll[i].classList.remove("pj_scroll_right");
            }
        }
    }
    
}




let pj_scroll = document.querySelectorAll("div.pj_scroll img");

function animarScroll() {
    let scrollTop = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;

    for (let i = 0; i < pj_scroll.length; i++) {
        let height = pj_scroll[i].offsetTop;

        // Mostrar el elemento si su posición está dentro del viewport
        if (scrollTop > height - windowHeight + 100 && scrollTop < height + windowHeight - 100) {
            pj_scroll[i].style.opacity = 1;

            // Aplicar animación de entrada desde la izquierda o derecha según el índice
            if (i % 2 === 0) {
                pj_scroll[i].classList.add("pj_scroll_left");
            } else {
                pj_scroll[i].classList.add("pj_scroll_right");
            }
        } else {
            // Ocultar el elemento si está fuera del rango visible
            pj_scroll[i].style.opacity = 0;
            pj_scroll[i].classList.remove("pj_scroll_left");
            pj_scroll[i].classList.remove("pj_scroll_right");
        }
    }
}



 
AL FINAL LO HICE CON CSS





window.addEventListener('scroll', animarScroll);*/