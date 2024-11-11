class Ficha extends ElementoDeJuego {
  constructor(x, y, ctx, radio, imagen) {
    super(x, y, ctx);
    this.radio = radio;
    this.ctx = ctx;
    this.seMueve = false; //indica si la ficha está en movimiento.
    this.imagenString = imagen; // Ruta de la imagen de la ficha.
    this.imagen = new Image(); // Crea un nuevo objeto de imagen.
    this.imagen.src = this.imagenString; // Asigna la ruta de la imagen.

    // Cuando la imagen esté cargada, se dibuja automáticamente.
    this.imagen.onload = () => {
      this.draw();
    };
  }

  // Método para dibujar la ficha en el canvas.
  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    this.ctx.clip();

    // Dibuja la imagen dentro del círculo.
    this.ctx.drawImage(
      this.imagen,
      this.x - this.radio,
      this.y - this.radio,
      this.radio * 2,
      this.radio * 2
    );

    this.ctx.restore();
  }

  // Método que verifica si la ficha ha sido clickeada, basándose en las coordenadas del mouse.
  estaClickeado(mouseX, mouseY) {
    // Calcula la distancia entre el mouse y el centro de la ficha.
    let distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance < this.radio; // Devuelve true si el mouse está dentro del radio de la ficha.
  }

  // Método para mover la ficha a nuevas coordenadas (x, y) y volver a dibujarla.
  mover(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  // Método para establecer el estado de movimiento de la ficha.
  setSeMueve(valor) {
    this.seMueve = valor;
  }

  // Método que devuelve el estado de movimiento de la ficha.
  seEstaMoviendo() {
    return this.seMueve;
  }

  // Método que devuelve la ruta de la imagen de la ficha.
  getImagenFicha() {
    return this.imagenString;
  }

  // Método de gravedad que hace que la ficha caiga hasta su posición final en el tablero.
  gravedad(filaFinal, Tablero) {
    // Calcula la posición Y final a la que debe caer la ficha.
    const targetY = filaFinal * Tablero.celda + Tablero.y + Tablero.celda / 2;

    // Posición inicial en la fila 0 (justo por encima de la zona de lanzamiento).
    this.y = Tablero.y - Tablero.celda; // Ajusta la posición inicial.

    // Crea un intervalo para animar la caída de la ficha.
    const intervaloCaida = setInterval(() => {
      this.y += 10;

      // Comprueba si ha llegado a su destino.
      if (this.y >= targetY) {
        this.y = targetY; // Alinea la ficha en la posición final.
        clearInterval(intervaloCaida); // Detiene la animación al llegar.
      }
    }, 20); // Intervalo de 20ms para la animación.
  }
}
