class Ficha extends ElementoDeJuego {
  constructor(x, y, ctx, radio, imagen) {
    super(x, y, ctx);
    this.radio = radio;
    this.ctx = ctx;
    this.seMueve = false;
    this.imagenString = imagen;
    // Crear y cargar la imagen
    this.imagen = new Image();
    this.imagen.src = this.imagenString;
    // Configurar el evento onload para dibujar la imagen cuando esté cargada
    this.imagen.onload = () => {
      this.draw(); // Llamar al método draw() cuando la imagen esté cargada
    };
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    this.ctx.clip(); // Clipa el contexto para que lo que se dibuje después quede dentro del círculo

    // Dibujar la imagen de llenado
    this.ctx.drawImage(
      this.imagen,
      this.x - this.radio,
      this.y - this.radio,
      this.radio * 2,
      this.radio * 2
    );

    // Restablecer el contexto para poder dibujar fuera del círculo si es necesario
    this.ctx.restore();
  }

  estaClickeado(mouseX, mouseY) {
    let distance = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
    return distance < this.radio;
  }

  mover(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  setSeMueve(valor) {
    this.seMueve = valor;
  }

  seEstaMoviendo() {
    return this.seMueve;
  }
  getImagenFicha() {
    return this.imagenString;
  }
}
