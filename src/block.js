class Block {
  constructor(color) {
    this.color = color;
  }

  draw() {
    let block = document.createElement("div");
    block.className = "block";
    block.style.width = `${CELL}rem`;
    block.style.height = `${CELL}rem`;
    block.style.backgroundColor = this.color;
    document.getElementById("wall").appendChild(block);
  }
}
