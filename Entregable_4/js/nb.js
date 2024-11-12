


//....................scrol de pj SEC4.................

let pj_scroll = document.querySelectorAll(".pj_scroll");


function animarScroll(){
    let scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    for (let i = 0; i< pj_scroll.length; i++){
        let height = pj_scroll[i].offsetTop;
        if(4500 > scrollTop){
            pj_scroll[i].style.opacity = 0;
            pj_scroll[i].classList.remove("pj_scroll_left");
            pj_scroll[i].classList.remove("pj_scroll_right");
        }
        if(height - 200 < scrollTop) {
            pj_scroll[i].style.opacity = 1;
            if(i%2==0){
                pj_scroll[i].classList.add("pj_scroll_left");
            }
            else{
                pj_scroll[i].classList.add("pj_scroll_right");
            }
        }
        if(height + 6500 < scrollTop){
            pj_scroll[i].style.opacity = 0;
            if(i%2==0){
                pj_scroll[i].classList.remove("pj_scroll_left");
            }
            else{
                pj_scroll[i].classList.remove("pj_scroll_right");
            }
        }
    }
    
}
window.addEventListener('scroll', animarScroll);