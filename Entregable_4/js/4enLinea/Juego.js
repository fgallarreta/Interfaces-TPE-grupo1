class Juego {
  // Constructor que inicializa el juego con dos jugadores, un tablero y un temporizador.
  constructor(jugador1, jugador2, tablero, timer) {
    this.jugador1 = jugador1; // Primer jugador.
    this.jugador2 = jugador2; // Segundo jugador.
    this.tablero = tablero; // Tablero del juego.
    this.timer = timer; // Temporizador del juego.
    this.jugador1.cambiarTurno(); // Cambia el turno al primer jugador.
    this.turnoActual = jugador1; // Establece el jugador actual al primer jugador.
  }

  // Método para cambiar el turno entre los jugadores.
  cambiarTurno() {
    this.turnoActual.cambiarTurno(); // Cambia el estado de turno del jugador actual.
    this.turnoActual =
      this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1; // Alterna entre jugador1 y jugador2.
    this.turnoActual.cambiarTurno(); // Cambia el estado de turno del nuevo jugador actual.
  }

  // Método para realizar un movimiento en la columna especificada.
  realizarMovimiento(columna) {
    let filaConFicha = this.turnoActual.colocarFicha(this.tablero, columna); // Intenta colocar una ficha en la columna del tablero.
    if (filaConFicha != null) {
      // Si se colocó la ficha correctamente.
      if (
        this.verificarNEnLinea(
          filaConFicha,
          columna,
          this.turnoActual.obtenerFichaJugador(),
          this.tablero.getNlineas()
        )
      ) {
        this.mostrarGanador(this.turnoActual.nombre); // Si hay un ganador, muestra el mensaje.
        clearInterval(timerInterval); // Detiene el temporizador.
      } else {
        this.cambiarTurno(); // Cambia el turno solo si no hay ganador.
      }
    }
  }

  // Método para verificar si hay 'n' fichas en línea.
  verificarNEnLinea(fila, columna, ficha, n) {
    // Se supone que ficha debe ser la ruta de una imagen (ej: 'images/fichaBulbasaur').
    return this.hayGanador(fila, columna, ficha, n); // Llama al método hayGanador para verificar.
  }

  // Método que verifica si hay un ganador en función de las filas, columnas y dirección.
  hayGanador(fila, columna, ficha, n) {
    // El parámetro n corresponde a la versión del juego que se está jugando (4, 5 o 6 en línea).
    return (
      this.verificarDireccion(n, fila, columna, ficha, 1, 0) || // Verifica en dirección horizontal.
      this.verificarDireccion(n, fila, columna, ficha, 0, 1) || // Verifica en dirección vertical.
      this.verificarDireccion(n, fila, columna, ficha, 1, 1) || // Verifica en dirección diagonal descendente.
      this.verificarDireccion(n, fila, columna, ficha, 1, -1) // Verifica en dirección diagonal ascendente.
    );
  }

  // Método que verifica si hay fichas contiguas del mismo equipo en la dirección especificada.
  verificarDireccion(
    n,
    fila,
    columna,
    nuevaFicha,
    incrementoFila,
    incrementoColumna
  ) {
    let contador = 0; // Contador para fichas en línea.

    // Verifica en la dirección positiva.
    for (let i = 0; i < n; i++) {
      const nuevaFila = fila + i * incrementoFila; // Nueva fila a verificar.
      const nuevaColumna = columna + i * incrementoColumna; // Nueva columna a verificar.

      // Asegúrate de que los índices estén dentro de los límites antes de acceder.
      if (!this.estaDentroDelTablero(nuevaFila, nuevaColumna)) break; // Si está fuera del tablero, se detiene.

      let ficha = this.tablero.matriz[nuevaFila][nuevaColumna]; // Obtiene la ficha en la posición actual.
      if (ficha && ficha.getImagenFicha() === nuevaFicha) {
        // Verifica si la ficha es la correcta.
        contador++; // Incrementa el contador si hay coincidencia.
      } else {
        break; // Detiene el conteo si no hay coincidencia.
      }
    }

    // Verificar en la dirección negativa.
    for (let i = 1; i < n; i++) {
      const nuevaFila = fila - i * incrementoFila; // Nueva fila a verificar en dirección opuesta.
      const nuevaColumna = columna - i * incrementoColumna; // Nueva columna a verificar en dirección opuesta.

      // Verifica los límites antes de acceder.
      if (!this.estaDentroDelTablero(nuevaFila, nuevaColumna)) break; // Si está fuera del tablero, se detiene.

      let ficha = this.tablero.matriz[nuevaFila][nuevaColumna]; // Obtiene la ficha en la posición actual.
      if (ficha && ficha.getImagenFicha() === nuevaFicha) {
        // Verifica si la ficha es la correcta.
        contador++; // Incrementa el contador si hay coincidencia.
      } else {
        break; // Detiene el conteo si no hay coincidencia.
      }
    }

    return contador >= n; // Retorna true si se encontraron 'n' fichas en línea.
  }

  // Verifica si una posición está dentro del tablero.
  estaDentroDelTablero(fila, columna) {
    return (
      fila >= 0 &&
      fila < this.tablero.filas &&
      columna >= 0 &&
      columna < this.tablero.columnas
    ); // Retorna true si la fila y columna están dentro de los límites del tablero.
  }

  // Método para mostrar el ganador y mostrar un mensaje emergente.
  mostrarGanador(jugador) {
    // Establecer el mensaje del ganador.
    mostrarPopup("¡Felicidades, " + jugador + "! Has ganado!");
    clearInterval(timer); // Detiene el temporizador.
  }
}
