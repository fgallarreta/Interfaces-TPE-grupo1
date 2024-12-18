// Variables y configuración inicial
const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
const timerElement = document.getElementById("timerValue");
const startGameButton = document.getElementById("startGame");
let fichasJ1 = document.querySelectorAll(".seleccionable");
let fichasJ2 = document.querySelectorAll(".seleccionable2");
let lineaTipo = document.querySelectorAll('input[name="tipoJuego"]');

lineaTipo.forEach(valor => {
  valor.addEventListener('change', (event) => {

    lineaTipo = parseInt(event.target.value, 10);
  });
});
fichasJ1.forEach(ficha => {
  ficha.addEventListener('click', () => {
    let partes = ficha.src.split('Entregable_4/');
    let tipoSeleccionado = partes[1];

    // Remover la clase 'seleccionada' de todas las fichas
    fichasJ1.forEach(f => f.classList.remove('seleccionada'));

    if (fichaTipoJ1 !== tipoSeleccionado) {
      // Seleccionar la nueva ficha
      ficha.classList.add('seleccionada');
      fichaTipoJ1 = tipoSeleccionado;
    } else {
      // Si ya estaba seleccionada, desmarcarla
      fichaTipoJ1 = null;
    }
  });
});

fichasJ2.forEach(ficha => {
  ficha.addEventListener('click', () => {
    let partes = ficha.src.split('Entregable_4/');
    let tipoSeleccionado = partes[1];

    // Remover la clase 'seleccionada' de todas las fichas
    fichasJ2.forEach(f => f.classList.remove('seleccionada'));

    if (fichaTipoJ2 !== tipoSeleccionado) {
      // Seleccionar la nueva ficha
      ficha.classList.add('seleccionada');
      fichaTipoJ2 = tipoSeleccionado;
    } else {
      // Si ya estaba seleccionada, desmarcarla
      fichaTipoJ2 = null;
    }
  });
});
startGameButton.addEventListener('click', function (event) {
  // Verificar que el jugador 1 haya seleccionado una ficha
  const fichaJ1Seleccionada = document.querySelector('#fichaTipoJ1 .seleccionable.seleccionada');
  // Verificar que el jugador 2 haya seleccionado una ficha
  const fichaJ2Seleccionada = document.querySelector('#fichaTipoJ2 .seleccionable2.seleccionada');
  // Verificar que se haya seleccionado un tipo de juego
  const tipoJuegoSeleccionado = document.querySelector('input[name="tipoJuego"]:checked');

  // Validar que todas las configuraciones estén completas
  if (!fichaJ1Seleccionada || !fichaJ2Seleccionada || !tipoJuegoSeleccionado) {
    event.preventDefault(); // Evitar que el juego inicie
    mostrarPopup('Faltan completar los campos de configuracion');
    return;
  }

  // Si todo está seleccionado
  document.getElementById("configPanel").style.display = "none"; // Oculta el panel de configuración
  canvas.style.display = "block"; // Muestra el canvas
  iniciarJuego(); // Llama a la función de inicio del juego
});

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
    clearInterval(timer);
  }
}

// Inicialización del juego
let tablero, jugador1, jugador2, juego;

function iniciarJuego() {

  // Configuración de fichas y tipo de juego
  const tipoFichaJ1 = fichaTipoJ1;
  const tipoFichaJ2 = fichaTipoJ2;


  switch (lineaTipo) {
    case 4:
      tablero = new Tablero(
        442,
        45,
        ctx,
        6,
        7,
        lineaTipo,
        "images/Casillero 72x72.png"
      );
      break;
    case 5:
      tablero = new Tablero(
        398,
        45,
        ctx,
        7,
        9,
        lineaTipo,
        "images/Casillero 72x72.png"
      );
      break;
    case 6:
      tablero = new Tablero(
        379,
        45,
        ctx,
        7,
        10,
        lineaTipo,
        "images/Casillero 72x72.png"
      );
      break;
  }

  jugador1 = new Jugador("Jugador 1", tipoFichaJ1, ctx);
  jugador2 = new Jugador("Jugador 2", tipoFichaJ2, ctx);

  jugador1.inicializarFichas(21);
  jugador2.inicializarFichas(21);
  juego = new Juego(jugador1, jugador2, tablero, timer);

  // Inicia el temporizador
  segundos = 120;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);

  render(); // Llama a la función de renderizado inicial
}

// Función de renderizado
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
  tablero.draw();
  jugador1.mostrarFichas();
  jugador2.mostrarFichas();

  requestAnimationFrame(render); // Redibuja el canvas
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
    tablero.mostrarFlechas = true;
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
    tablero.mostrarFlechas = false;
    fichaSeleccionada = null;

  }
});



const popup = document.getElementById("popup");
const popupMensaje = document.getElementById("popupMensaje");

// Función para mostrar el popup con un mensaje personalizado
function mostrarPopup(mensaje) {
  setTimeout(() => {
    popupMensaje.textContent = mensaje; // Cambia el contenido del mensaje
    popup.classList.remove("ocultar"); // Muestra el popup
  }, 1000);
}

