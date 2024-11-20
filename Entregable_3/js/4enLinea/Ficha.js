class Ficha extends ElementoDeJuego {
  constructor(x, y, ctx, radio, imagen) {
    super(x, y, ctx);
    this.radio = radio;
    this.ctx = ctx;
    this.seMueve = false;
    this.imagenString = imagen;
    this.imagen = new Image();
    this.imagen.src = this.imagenString;

    // Dibujar la imagen cuando esté cargada
    this.imagen.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    this.ctx.clip();

    // Dibujar la imagen dentro del círculo
    this.ctx.drawImage(
      this.imagen,
      this.x - this.radio,
      this.y - this.radio,
      this.radio * 2,
      this.radio * 2
    );

    this.ctx.restore();
  }

  estaClickeado(mouseX, mouseY) {
    let distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance < this.radio;
  }

  mover(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  setSeMueve(valor) {
    this.seMueve = valor;
  }

  seEstaMoviendo() {
    return this.seMueve;
  }

  getImagenFicha() {
    return this.imagenString;
  }

  // Método de gravedad para hacer que la ficha caiga desde la fila 0 hasta su posición en el tablero
  gravedad(filaFinal, Tablero) {
    const targetY = (filaFinal * Tablero.celda + Tablero.y) + Tablero.celda / 2;

    // Posición inicial en la fila 0 (justo por encima de la zona de lanzamiento)
    this.y = Tablero.y - Tablero.celda; // Un poco por encima de la fila de lanzamiento

    const intervaloCaida = setInterval(() => {
      this.y += 10; // Ajusta la velocidad de caída

      // Comprueba si ha llegado a su destino
      if (this.y >= targetY) {
        this.y = targetY; // Alinea la ficha en la posición final
        clearInterval(intervaloCaida); // Detiene la animación
      }

     
    }, 20);
  }
}
