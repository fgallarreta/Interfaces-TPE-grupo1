btn_play = document.getElementById("btn-play");
btn_play.addEventListener('click', showConfig);
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let fichasEnPartida = [];
let matriz = [];
let mode = 0;
let tablero;

function showConfig() {
    let selecionModo = document.getElementById("selecionModo");
    let selecionFicha = document.getElementById("fichasEleccion");
    let btn_modo = document.getElementById("btn-modo");
    let start_game = document.getElementById("start-game");

    btn_modo.addEventListener('click', showSelecionFicha);
    start_game.addEventListener('click', startGame)
    selecionModo.addEventListener('click', selecionFicha);

    showMode();
    function showMode() {
        selecionModo.classList.toggle("active");
        let buttonMode4 = document.getElementById("mode4");
        let buttonMode5 = document.getElementById("mode5");
        let buttonMode6 = document.getElementById("mode6");
        let buttonMode7 = document.getElementById("mode7");
        buttonMode4.addEventListener("click", () => {
            mode = 4;
        });
        buttonMode5.addEventListener("click", () => {
            mode = 5;
        });
        buttonMode6.addEventListener("click", () => {
            mode = 6;
        });
        buttonMode7.addEventListener("click", () => {
            mode = 7;
        });

    }

    function showSelecionFicha() {
        selecionModo.classList.toggle("sacar");
        selecionFicha.classList.toggle("active");
    }
    function startGame() {
        selecionFicha.classList.toggle("sacar");
        armarTablero(mode);
        let imgironman = "assets/ironman-logo.png";
        let imgcapitan = "captain.america.logo.png";
        drawFicha("ironman", 45, 45, "red", imgironman)
        tablero.drawTablero();
    }
    function armarTablero() {
        tablero = new Tablero(ctx, mode, 5, 67);
    }
}
function play() {
}
function createTablero(inicioTable) {
    for (let x = 0; x < filas; x++) {
        let fila = [];
        let inicioX = inicioTable;
        let finX = inicioTable + 105.3;
        for (let y = 0; y < columnas; y++) {
            casillero = new Casillero(ctx, inicioX, finX, inicioY, finY);
            fila.push(casillero);
            inicioX = inicioX + 105.3;
            finX = finX + 105.3;
        }
        matriz.push(fila);
        inicioY = inicioY + 67;
        finY = finY + 67;
    }
}

function drawFicha(name, x, y, color, img) {
    ficha = new Circle(name, x, y, 25, color, ctx, img);
    fichasEnPartida.push(ficha);
    actualizar();
}
function actualizar() {
    clearCanvas();
    for (let i = 0; i < fichasEnPartida.length; i++) {
        fichasEnPartida[i].draw();
    }
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j].draw();
            matriz[i][j].drawObj();
        }
    }
}