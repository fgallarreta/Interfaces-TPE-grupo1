class Jugador {
  constructor(nombre, imagenFicha, ctx) {
    this.nombre = nombre;
    this.fichasDisponibles = []; // Array para almacenar las fichas disponibles del jugador.
    this.turno = false; // Indica si es el turno del jugador.
    this.ctx = ctx;
    this.imagenFicha = imagenFicha;
  }

  // Método para inicializar las fichas del jugador con la cantidad especificada.
  inicializarFichas(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.fichasDisponibles.push(
        new Ficha(0, 0, this.ctx, 19, this.imagenFicha)
      );
    }
  }

  // Método para colocar una ficha en el tablero en la columna especificada.
  colocarFicha(tablero, columna) {
    if (this.turno && this.fichasDisponibles.length > 0) {
      // Verifica si es el turno del jugador y hay fichas disponibles.
      let ficha = this.fichasDisponibles.pop(); // Toma la última ficha del array.
      return tablero.agregarFicha(columna, ficha); // Intenta agregar la ficha al tablero y retorna la fila donde se colocó.
    }
    return false; // Retorna false si no se puede colocar la ficha.
  }

  // Método para cambiar el turno entre los jugadores.
  cambiarTurno() {
    this.turno = !this.turno; // Invierte el estado del turno.
  }

  // Método para obtener el estado del turno del jugador.
  getTurno() {
    return this.turno; // Retorna true si es el turno del jugador, false si no.
  }

  // Método para mostrar las fichas del jugador en el pilón.
  mostrarFichas() {
    const pilonX = this.nombre == "Jugador 1" ? 180 : 1000; // Posición X del pilón según el jugador.
    const pilonY = 50; // Posición Y inicial del pilón.
    const espacioEntreFichas = 20; // Espaciado entre las fichas.

    this.fichasDisponibles.forEach((ficha, index) => {
      // Solo actualiza la posición si la ficha no está en movimiento o en el tablero.
      if (!ficha.seEstaMoviendo()) {
        ficha.x = pilonX; // Establece la posición X del pilón.
        ficha.y = pilonY + index * espacioEntreFichas; // Calcula la posición Y para cada ficha en el pilón.
      }
      ficha.draw();
    });
  }

  // Método para obtener la imagen de la ficha del jugador.
  obtenerFichaJugador() {
    return this.imagenFicha;
  }
}
