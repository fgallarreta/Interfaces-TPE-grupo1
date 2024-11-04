const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");
// Crear la imagen de fondo
let imagenFondo = new Image();
imagenFondo.src = "images/Fondo.png"; // Asegúrate de que la ruta sea correcta

// Cargar la imagen y dibujarla en el canvas
imagenFondo.onload = () => {
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height); // Dibuja el fondo
};
const tablero = new Tablero(418, 98, ctx, 6, 7, "images/Casillero 72x72.png");
const jugador1 = new Jugador("Jugador 1", "images/FichaPikachu.png", ctx);
const jugador2 = new Jugador("Jugador 2", "images/FichaSquirtle.png", ctx);

jugador1.inicializarFichas(21);
jugador2.inicializarFichas(21);
const juego = new Juego(jugador1, jugador2, tablero);

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height); // Dibuja el fondo
  tablero.draw();
  // Dibuja las fichas disponibles de cada jugador
  jugador1.mostrarFichas(); // Dibuja las fichas del jugador 1
  jugador2.mostrarFichas(); // Dibuja las fichas del jugador 2
  tablero.actualizarFlecha(); // Mover la flecha en cada fotograma
  requestAnimationFrame(render);
}

render();

// Lógica de arrastrar y soltar
let fichaSeleccionada = null;
let offsetX = 0;
let offsetY = 0;

canvas.addEventListener("mousedown", (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  // Verifica quién tiene el turno y busca la ficha
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
    render(); // Redibuja el canvas para mostrar la ficha en movimiento
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (fichaSeleccionada) {
    // Verificar si la ficha está en la fila 0 (primer fila del tablero)
    if (fichaSeleccionada.y < tablero.y + tablero.celda) {
      // Calcular la columna correspondiente en el tablero
      let columna = Math.floor(
        (fichaSeleccionada.x - tablero.x) / tablero.celda
      );

      // Verificar si la columna es válida
      if (columna >= 0 && columna < tablero.columnas) {
        let fila = juego.realizarMovimiento(columna);
        if (fila === null) {
          // Si no se pudo colocar, devolver la ficha a su posición original
          fichaSeleccionada.x = 180; // Posición inicial de las fichas
          fichaSeleccionada.y = 90; // Ajusta según sea necesario
        }
      } else {
        // Si la columna no es válida, devolver la ficha
        fichaSeleccionada.x = 180; // Posición inicial de las fichas
        fichaSeleccionada.y = 90; // Ajusta según sea necesario
      }
    }
    // Limpiar la ficha seleccionada
    fichaSeleccionada.setSeMueve(false);
    fichaSeleccionada = null;

    // Redibujar todo el canvas para reflejar el cambio
    render();
  }
});
