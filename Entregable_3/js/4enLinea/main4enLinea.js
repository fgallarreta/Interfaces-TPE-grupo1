const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timerValue");
const startGameButton = document.getElementById("startGame");
let fichaTipoJ1 = document.getElementById("fichaTipoJ1");
let fichaTipoJ2 = document.getElementById("fichaTipoJ2");
let lineaTipo = document.getElementById("lineaTipo");

// Variables del temporizador
let timer;
let segundos = 120;

// Crear la imagen de fondo
let imagenFondo = new Image();
imagenFondo.src = "images/Fondo.png";

imagenFondo.onload = () => {
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
};

// Función para actualizar el temporizador
function updateTimer() {
  if (segundos > 0) {
    segundos--;
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const seg = String(segundos % 60).padStart(2, "0");
    timerElement.textContent = `${min}:${seg}`;
  } else {
    mostrarPopup("Empate!!!");
    clearInterval(timerInterval);
  }
}

function empate() {
  const popup = document.getElementById('popup-empate');
  const Mensaje = document.getElementById('Mensaje');
  
  // Establecer el mensaje del ganador
  Mensaje.textContent = `¡Empate!`;
  
  // Mostrar el popup
  popup.classList.remove('hidden');
}

// Inicialización del juego
let tablero, jugador1, jugador2, juego;

function iniciarJuego() {
  // Configuración de fichas y tipo de juego
  const tipoFichaJ1 = fichaTipoJ1.value;
  const tipoFichaJ2 = fichaTipoJ2.value;
  const tipoLinea = parseInt(lineaTipo.value, 10);
  if (tipoLinea == 4) {
    tablero = new Tablero(
      418,
      98,
      ctx,
      6,
      7,
      tipoLinea,
      "images/Casillero 72x72.png"
    );
  }
  else if (tipoLinea ==5) {
    tablero = new Tablero(
      366,
      68,
      ctx,
      7,
      9,
      tipoLinea,
      "images/Casillero 72x72.png"
    );}
    else if (tipoLinea== 6) {
      tablero = new Tablero(
        342,
        62,
        ctx,
        7,
        10,
        tipoLinea,
        "images/Casillero 72x72.png"
      );
    }
  
 
  jugador1 = new Jugador("Jugador 1", tipoFichaJ1, ctx);
  jugador2 = new Jugador("Jugador 2", tipoFichaJ2, ctx);

  jugador1.inicializarFichas(21);
  jugador2.inicializarFichas(21);
  juego = new Juego(jugador1, jugador2, tablero);

  // Inicia el temporizador
  seconds = 0;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  render();
}

// Función de renderizado
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
  tablero.draw();
  jugador1.mostrarFichas();
  jugador2.mostrarFichas();
  tablero.actualizarFlecha();
  requestAnimationFrame(render);
}

// Lógica de arrastrar y soltar
let fichaSeleccionada = null;
let offsetX = 0;
let offsetY = 0;

canvas.addEventListener("mousedown", (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;
  const jugadorActual = jugador1.getTurno() ? jugador1 : jugador2;

  jugadorActual.fichasDisponibles.forEach((ficha) => {
    if (ficha.estaClickeado(mouseX, mouseY)) {
      fichaSeleccionada = ficha;
      offsetX = mouseX - ficha.x;
      offsetY = mouseY - ficha.y;
      ficha.setSeMueve(true);
    }
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (fichaSeleccionada && fichaSeleccionada.seEstaMoviendo()) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    fichaSeleccionada.mover(mouseX - offsetX, mouseY - offsetY);
    render();
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (fichaSeleccionada) {
    if (fichaSeleccionada.y < tablero.y + tablero.celda) {
      let columna = Math.floor(
        (fichaSeleccionada.x - tablero.x) / tablero.celda
      );

      if (columna >= 0 && columna < tablero.columnas) {
        let fila = juego.realizarMovimiento(columna);
        if (fila === null) {
          fichaSeleccionada.x = 180;
          fichaSeleccionada.y = 90;
        }
      } else {
        fichaSeleccionada.x = 180;
        fichaSeleccionada.y = 90;
      }
    }

    fichaSeleccionada.setSeMueve(false);
    fichaSeleccionada = null;
    render();
  }
});

// Iniciar el juego al hacer clic en el botón de inicio
document.getElementById("startGame").addEventListener("click", () => {
  // Ocultar el panel de configuración
  
  document.getElementById("configPanel").style.display = "none";
  // Mostrar el canvas
  document.getElementById("miCanvas").style.display = "block";
  // Iniciar el juego
  iniciarJuego();
});

// Agregar evento para cerrar el popup
document.getElementById('close').addEventListener('click', function() {
  const popup = document.getElementById('popup');
  popup.classList.add('hidden');
});
