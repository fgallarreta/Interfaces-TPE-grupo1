class ElementoDeJuego {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.ctx = context;
    
  }
  draw() {}
  cambiarPos(x, y) {
    this.x = x;
    this.y = y;
  }
  getPosicion() {
    return "X:" + this.getX() + ", Y:" + this.getY();
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getfill() {
    return this.fondo;
  }
}
