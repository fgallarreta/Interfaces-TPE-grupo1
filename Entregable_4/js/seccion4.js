document.addEventListener('DOMContentLoaded', () => {
    const images = [
      'imagesNB/pjScroll0.svg', 'imagesNB/pjScroll1.svg', 'imagesNB/pjScroll2.svg', 
      'imagesNB/pjScroll3.svg', 'imagesNB/pjScroll4.svg', 'imagesNB/pjScroll5.svg', 
      'imagesNB/pjScroll6.svg', 'imagesNB/pjScroll7.svg', 'imagesNB/pjScroll8.svg', 
      'imagesNB/pjScroll9.svg', 'imagesNB/pjScroll10.svg'
    ];
  
    const imageElements = document.querySelectorAll('.hidden');
    const totalImages = images.length;
    const section4 = document.querySelector('.section4');
    const containerPj = document.querySelector('.container_pj');
  
    const handleScroll = () => {
      // Obtener la posición de la sección en relación con el viewport
      const sectionTop = section4.getBoundingClientRect().top;
      const sectionBottom = section4.getBoundingClientRect().bottom;
      
      // Verificar si la sección está visible en la ventana del navegador
      if (sectionTop <= window.innerHeight && sectionBottom >= 0) {
        // Calcular la posición del scroll dentro de la sección
        const scrollPosition = window.scrollY - section4.offsetTop;
        const sectionHeight = section4.offsetHeight;
  
        
        //Calculo el index del arreglo de imagenes dependiendo la posicion en la que estoy
        const frecCambio = 1.1;
        const imageIndex = Math.min(Math.round((scrollPosition / sectionHeight) * totalImages * frecCambio), totalImages - 1);

  
        //Segun el index calculado, cambio la imagen que se muestra segun la posicion del scroll, ocultando todas las otras
        imageElements.forEach((img, index) => {
          if (index === imageIndex) {
            img.src = images[index];
            img.style.opacity = 1;
          } else {
            img.style.opacity = 0;
          }
        });


      }
    };
  
    //Ejecuto la funcion al detectarse scroll en la pagina
    window.addEventListener('scroll', handleScroll);
  
    //Llamo la función al cargar la página
    handleScroll();
});
