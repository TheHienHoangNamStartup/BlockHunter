class Container extends Sprite {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  draw() {
    let container = document.createElement("div");
    container.id = "container";
    container.style.width = `${this.width * CELL}rem`;
    container.style.height = `${this.height * CELL}rem`;
    container.style.padding = `${CELL}rem`;
    document.body.appendChild(container);
  }
}
