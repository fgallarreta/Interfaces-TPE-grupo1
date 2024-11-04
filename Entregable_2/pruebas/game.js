// Clase Casillero
class Casillero {
    constructor() {
        this.ficha = null;
    }

    colocarFicha(ficha) {
        this.ficha = ficha;
    }

    estaVacio() {
        return this.ficha === null;
    }

    obtenerFicha() {
        return this.ficha;
    }
}

// Clase Ficha
class Ficha {
    constructor(jugador) {
        this.jugador = jugador;
    }

    obtenerJugador() {
        return this.jugador;
    }
}

// Clase Tablero
class Tablero {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.grid = this.inicializarTablero();
        this.renderizarTablero();
    }

    inicializarTablero() {
        const grid = [];
        for (let i = 0; i < this.filas; i++) {
            const fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(new Casillero());
            }
            grid.push(fila);
        }
        return grid;
    }

    colocarFichaEnColumna(columna, ficha) {
        for (let i = this.filas - 1; i >= 0; i--) {
            if (this.grid[i][columna].estaVacio()) {
                this.grid[i][columna].colocarFicha(ficha);
                this.renderizarTablero();
                return { fila: i, columna: columna };
            }
        }
        return null;
    }

    renderizarTablero() {
        const tableroDiv = document.getElementById("tablero");
        tableroDiv.innerHTML = "";
        tableroDiv.style.gridTemplateColumns = `repeat(${this.columnas}, 50px)`;

        this.grid.forEach((fila, i) => {
            fila.forEach((casillero, j) => {
                const casilleroDiv = document.createElement("div");
                casilleroDiv.classList.add("casillero");
                casilleroDiv.dataset.columna = j;
                casilleroDiv.addEventListener("dragover", (e) => e.preventDefault());
                casilleroDiv.addEventListener("drop", (e) => this.manejarDrop(e));

                if (casillero.obtenerFicha() !== null) {
                    const jugador = casillero.obtenerFicha().obtenerJugador();
                    casilleroDiv.classList.add(jugador === 1 ? "jugador1" : "jugador2");
                }

                tableroDiv.appendChild(casilleroDiv);
            });
        });
    }

    manejarDrop(event) {
        const columna = parseInt(event.target.dataset.columna);
        const jugador = turnoJugador;
        const ficha = new Ficha(jugador);
        const posicion = this.colocarFichaEnColumna(columna, ficha);
        if (posicion) {
            animarCaidaFicha(posicion, jugador);
            if (verificarGanador(posicion.fila, posicion.columna, jugador)) {
                mostrarGanador(jugador);
            } else {
                alternarTurno();
            }
        } else {
            alert("La columna está llena. Intente otra.");
        }
    }
}

// Inicializa el tablero y las fichas de cada jugador
function inicializarJuego(filas, columnas) {
    tablero = new Tablero(filas, columnas);
    turnoJugador = 1;

    const fichasJugador1 = document.getElementById("fichasJugador1");
    const fichasJugador2 = document.getElementById("fichasJugador2");
    fichasJugador1.innerHTML = '';
    fichasJugador2.innerHTML = '';

    for (let i = 0; i < (filas * columnas) / 2; i++) {
        const ficha1 = document.createElement("div");
        ficha1.classList.add("ficha");
        ficha1.draggable = true;
        ficha1.dataset.jugador = "1";
        ficha1.style.position = 'absolute'; // Para poder posicionarlas de manera orgánica
        ficha1.style.top = `${Math.random() * 260}px`; // Limita el rango para que no se salgan del contenedor
        ficha1.style.left = `${Math.random() * 60}px`;
        ficha1.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("jugador", turnoJugador);
            ficha1.classList.add(turnoJugador === 1 ? "jugador1" : "jugador2");
        });
        fichasJugador1.appendChild(ficha1);

        const ficha2 = document.createElement("div");
        ficha2.classList.add("ficha");
        ficha2.draggable = true;
        ficha2.dataset.jugador = "2";
        ficha2.style.position = 'absolute';
        ficha2.style.top = `${Math.random() * 260}px`;
        ficha2.style.left = `${Math.random() * 60}px`;
        ficha2.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("jugador", turnoJugador);
            ficha2.classList.add(turnoJugador === 1 ? "jugador1" : "jugador2");
        });
        fichasJugador2.appendChild(ficha2);
    }
}

// Animación de caída con gravedad
function animarCaidaFicha(posicion, jugador) {
    const fichaDiv = document.createElement("div");
    fichaDiv.classList.add("ficha", jugador === 1 ? "jugador1" : "jugador2");
    fichaDiv.style.position = "absolute";
    fichaDiv.style.top = "0px";
    fichaDiv.style.transition = `top ${0.1 * posicion.fila}s ease-out`;
    document.getElementById("tablero").appendChild(fichaDiv);

    // Efecto de caída hasta posición final
    setTimeout(() => {
        fichaDiv.style.top = `${posicion.fila * 55}px`;
    }, 10);
}

// Verificación de ganador (lógica inicial)
function verificarGanador(fila, columna, jugador) {
    // Implementar lógica de verificación en 4 direcciones (horizontal, vertical, diagonal)
    return false;
}

function mostrarGanador(jugador) {
    const mensaje = document.getElementById("mensajeGanador");
    mensaje.innerText = `¡Jugador ${jugador} gana!`;
    mensaje.style.display = "block";
}

// Alterna el turno entre jugadores
function alternarTurno() {
    turnoJugador = turnoJugador === 1 ? 2 : 1;
}

// Inicialización del juego
document.getElementById("btnGenerarTablero").addEventListener("click", () => {
    const filas = parseInt(document.getElementById("filas").value);
    const columnas = parseInt(document.getElementById("columnas").value);
    inicializarJuego(filas, columnas);
});

// Variables globales
let tablero = null;
let turnoJugador = 1;
