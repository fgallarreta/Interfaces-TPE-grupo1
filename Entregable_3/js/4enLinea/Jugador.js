class Jugador {
  constructor(nombre, imagenFicha, ctx) {
    this.nombre = nombre;
    this.fichasDisponibles = [];
    this.turno = false;
    this.ctx = ctx;
    this.imagenFicha = imagenFicha;
  }

  inicializarFichas(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.fichasDisponibles.push(new Ficha(0, 0, ctx, 22, this.imagenFicha));
    }
  }

  colocarFicha(tablero, columna) {
    if (this.turno && this.fichasDisponibles.length > 0) {
      let ficha = this.fichasDisponibles.pop();
      return tablero.agregarFicha(columna, ficha);
    }
    return false;
  }

  cambiarTurno() {
    this.turno = !this.turno;
  }
  getTurno() {
    return this.turno;
  }
  mostrarFichas() {
    const pilonX = this.nombre == "Jugador 1" ? 180 : 1000; // Posición X del pilón según el jugador
    const pilonY = 80; // Posición Y inicial
    const espacioEntreFichas = 20; // Espaciado entre las fichas

    this.fichasDisponibles.forEach((ficha, index) => {
      // Solo actualiza la posición si la ficha no está en movimiento o en el tablero
      if (!ficha.seEstaMoviendo()) {
        ficha.x = pilonX; // Establece la posición X del pilón
        ficha.y = pilonY + index * espacioEntreFichas; // Calcula la posición Y para cada ficha
      }
      ficha.draw(); // Dibuja la ficha en el canvas
    });
  }
  obtenerFichaJugador() {
    return this.imagenFicha;
  }
}
