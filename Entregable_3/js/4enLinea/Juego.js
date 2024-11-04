class Juego {
  constructor(jugador1, jugador2, tablero) {
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
    this.tablero = tablero;
    this.turnoActual = jugador1;
    this.jugador1.cambiarTurno();
  }

  cambiarTurno() {
    this.turnoActual.cambiarTurno();
    this.turnoActual =
      this.turnoActual === this.jugador1 ? this.jugador2 : this.jugador1;
    this.turnoActual.cambiarTurno();
  }

  realizarMovimiento(columna) {
    
    let filaConFicha = this.turnoActual.colocarFicha(this.tablero, columna);
    if (filaConFicha != null) {
      if (
        this.verificarNEnLinea(
          filaConFicha,
          columna,
          this.turnoActual.obtenerFichaJugador(),
          this.tablero.getNlineas()
        )
      ) {
        this.mostrarGanador(this.turnoActual.nombre);
      } else {
        this.cambiarTurno(); // Cambia el turno solo si no hay ganador
      }
    }
  }

  verificarNEnLinea(fila, columna, ficha, n) {
    //Se supone que ficha debe ser la ruta de una imagen (ej: 'images/fichaBulbasaur')
    if (this.hayGanador(fila, columna, ficha, n)) {
      return true;
    } else return false;
  }

  hayGanador(fila, columna, ficha, n) {
    //El parametro n corresponde a la version del juego que se esta jugando (4,5 o 6  en linea)
    return (
      this.verificarDireccion(n, fila, columna, ficha, 1, 0) || //Verifica en direccion Horizontal
      this.verificarDireccion(n, fila, columna, ficha, 0, 1) || //Verifica en direccion Vertical
      this.verificarDireccion(n, fila, columna, ficha, 1, 1) || //Verifica en direccion Diagonal descendente
      this.verificarDireccion(n, fila, columna, ficha, 1, -1) //Verifica en direccion Diagonal ascendente
    );
  }

  //Verifica si hay fichas contiguas del mismo equipo
  verificarDireccion(
    n,
    fila,
    columna,
    nuevaFicha,
    incrementoFila,
    incrementoColumna
  ) {
    let contador = 0;

    // Verifica en la dirección positiva
    for (let i = 0; i < n; i++) {
      const nuevaFila = fila + i * incrementoFila;
      const nuevaColumna = columna + i * incrementoColumna;

      // Asegúrate de que los índices estén dentro de los límites antes de acceder
      if (!this.estaDentroDelTablero(nuevaFila, nuevaColumna)) break;

      let ficha = this.tablero.matriz[nuevaFila][nuevaColumna];
      if (ficha && ficha.getImagenFicha() === nuevaFicha) {
        contador++;
      } else {
        break;
      }
    }

    // Verificar en la dirección negativa
    for (let i = 1; i < n; i++) {
      const nuevaFila = fila - i * incrementoFila;
      const nuevaColumna = columna - i * incrementoColumna;

      // Verifica los límites antes de acceder
      if (!this.estaDentroDelTablero(nuevaFila, nuevaColumna)) break;

      let ficha = this.tablero.matriz[nuevaFila][nuevaColumna];
      if (ficha && ficha.getImagenFicha() === nuevaFicha) {
        contador++;
      } else {
        break;
      }
    }

    return contador >= n;
  }

  //Verifica si una posicion esta dentro del tablero
  estaDentroDelTablero(fila, columna) {
    return (
      fila >= 0 &&
      fila < this.tablero.filas &&
      columna >= 0 &&
      columna < this.tablero.columnas
    );
  }

  mostrarGanador(ganador) {
    console.log(ganador);
  }
}
