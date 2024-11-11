class Tablero extends ElementoDeJuego {
  // Constructor que inicializa el tablero con sus dimensiones, contexto, y la imagen del casillero.
  constructor(x, y, ctx, filas, columnas, n, imagenCasilleroSrc) {
    super(x, y, ctx);
    this.filas = filas + 1; // Agrega una fila extra para la "zona de lanzamiento".
    this.columnas = columnas;
    this.n = n; // Número de fichas necesarias en línea para ganar.
    this.celda = 52; // Tamaño de cada celda del tablero.

    // Crea una matriz para el tablero, inicializando todas las posiciones como null.
    this.matriz = Array.from({ length: this.filas }, () =>
      Array(this.columnas).fill(null)
    );

    // Cargar la imagen del casillero.
    this.imagenCasillero = new Image();
    this.imagenCasillero.src = imagenCasilleroSrc;

    // Inicialización de parámetros para dibujar flechas en la zona de lanzamiento.
    this.arrowCount = this.columnas; // Número de flechas en la fila.
    this.arrowSpacing = 15; // Espacio entre flechas.
    this.arrowHeight = 40; // Altura de cada flecha.
    this.yOffset = 0; // Desplazamiento vertical de las flechas.
  }

  // Método para agregar una ficha en la columna especificada.
  agregarFicha(columna, ficha) {
    for (let fila = this.filas - 1; fila > 0; fila--) {
      // Comienza desde la fila visible (la última fila del tablero).
      if (this.matriz[fila][columna] === null) {
        this.matriz[fila][columna] = ficha; // Coloca la ficha en la matriz.

        // Calcula la posición de la ficha en el canvas.
        ficha.x = this.x + columna * this.celda + 26; // Centra la ficha en la celda.
        ficha.y = this.y + fila * this.celda + 26; // Ajusta la posición Y.

        if (fila != null) {
          ficha.gravedad(fila, this); // Llama al método de gravedad para que la ficha caiga.
          return fila; // Retorna la fila donde se colocó la ficha.
        }
      }
    }
    return null; // Retorna null si la columna está llena.
  }

  // Método para dibujar el tablero con las celdas de casillero.
  draw() {
    // Dibuja cada celda del casillero.
    for (let fila = 1; fila < this.filas; fila++) {
      // Evitar la fila de "zona de lanzamiento".
      for (let columna = 0; columna < this.columnas; columna++) {
        let xCelda = this.x + columna * this.celda; // Posición X de la celda.
        let yCelda = this.y + fila * this.celda; // Posición Y de la celda.

        // Dibuja la imagen del casillero en cada celda.
        this.ctx.drawImage(
          this.imagenCasillero,
          xCelda,
          yCelda,
          this.celda,
          this.celda
        );

        // Dibuja la ficha si existe en la celda actual.
        let ficha = this.matriz[fila][columna];
        if (ficha) ficha.draw();
      }
    }
    // Llama al método para dibujar las flechas.
    this.drawArrows();
  }

  // Método para dibujar una flecha en la posición especificada (x, y).
  drawArrow(x, y) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(Math.PI);

    const grad = this.ctx.createLinearGradient(
      -this.celda / 2,
      0,
      this.celda / 2,
      0
    );
    grad.addColorStop(0, "#FFCC00");
    grad.addColorStop(1, "#FF9966");

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0); // Punto superior de la flecha (ahora es el nuevo origen).
    this.ctx.lineTo(-this.celda / 2, this.arrowHeight); // Esquina inferior izquierda.
    this.ctx.lineTo(this.celda / 2, this.arrowHeight); // Esquina inferior derecha.
    this.ctx.closePath();

    this.ctx.fillStyle = grad;
    this.ctx.fill();

    this.ctx.restore();
  }

  // Método para dibujar las flechas en la zona de lanzamiento.
  drawArrows() {
    for (let i = 0; i < this.arrowCount; i++) {
      const x = this.x + i * this.celda + this.celda / 2; // Centrar flechas en cada columna.
      this.drawArrow(x, 80 + this.yOffset); // Dibujar flecha en la posición actual.
    }

    this.yOffset += 0.5; // Incrementa el desplazamiento vertical.

    // Resetear el desplazamiento si las flechas se pasan de largo hacia el tablero.
    if (this.yOffset > this.arrowHeight + 20) {
      this.yOffset = -this.arrowHeight; // Reinicia el desplazamiento.
    }
  }

  // Método para obtener el número de líneas necesarias para ganar.
  getNlineas() {
    return this.n;
  }
}
