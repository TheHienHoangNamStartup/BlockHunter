class Container {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw() {
    let container = document.createElement("div");
    container.id = "container";
    container.style.width = `${(this.width + 2) * CELL}rem`;
    container.style.height = `${(this.height + 2) * CELL}rem`;
    container.style.padding = `${CELL}rem`;
    document.body.appendChild(container);
  }
}
