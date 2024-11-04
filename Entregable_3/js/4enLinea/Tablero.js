class Tablero extends ElementoDeJuego {
  constructor(x, y, ctx, filas, columnas, n, imagenCasilleroSrc) {
    super(x, y, ctx);
    this.filas = filas + 1; // Agregar una fila extra para la "zona de lanzamiento"
    this.columnas = columnas;
    this.n = n;
    this.celda = 52;
    this.matriz = Array.from({ length: this.filas }, () =>
      Array(this.columnas).fill(null)
    );

    // Cargar la imagen del casillero
    this.imagenCasillero = new Image();
    this.imagenCasillero.src = imagenCasilleroSrc;

    this.columnaFlecha = 0; // Columna inicial de la flecha
  }

  // Método para agregar una ficha en la columna
  agregarFicha(columna, ficha) {
    for (let fila = this.filas - 1; fila > 0; fila--) {
      // Empezar desde la fila visible
      if (this.matriz[fila][columna] === null) {
        this.matriz[fila][columna] = ficha;
        ficha.x = this.x + columna * this.celda + 26;
        ficha.y = this.y + fila * this.celda + 26;
        if (fila != null) {
          ficha.gravedad(fila ,this);
          return fila; // Retornar la fila donde se colocó la ficha o null si esta llena
        }
        
      }
    }
    return null;
  }

  // Dibujar el tablero con las celdas de casillero
  draw() {
    // Dibujar cada celda del casillero
    for (let fila = 1; fila < this.filas; fila++) {
      // Evitar la fila de "zona de lanzamiento"
      for (let columna = 0; columna < this.columnas; columna++) {
        let xCelda = this.x + columna * this.celda;
        let yCelda = this.y + fila * this.celda;

        // Dibujar la imagen del casillero en cada celda
        this.ctx.drawImage(
          this.imagenCasillero,
          xCelda,
          yCelda,
          this.celda,
          this.celda
        );

        // Dibujar la ficha si existe
        let ficha = this.matriz[fila][columna];
        if (ficha) ficha.draw();
      }
    }

    // Dibujar flecha de pista
    //this.drawFlecha();
  }

  // Animación de la flecha
  drawFlecha() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.6)"; // Color semitransparente para la flecha
    const flechaX = this.x + this.columnaFlecha * this.celda;
    const flechaY = this.y;

    // Dibujar una flecha simple (triángulo) apuntando hacia abajo
    this.ctx.beginPath();
    this.ctx.moveTo(flechaX + this.celda / 2, flechaY + 10);
    this.ctx.lineTo(flechaX + this.celda / 4, flechaY + this.celda - 10);
    this.ctx.lineTo(flechaX + (3 * this.celda) / 4, flechaY + this.celda - 10);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  // Método para actualizar la posición de la flecha
  actualizarFlecha() {
    this.columnaFlecha = (this.columnaFlecha + 1) % this.columnas; // Mover la flecha a la siguiente columna
  }
  getNlineas() {
    return this.n;
  }
}
