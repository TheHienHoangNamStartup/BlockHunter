class Block extends Sprite {
  constructor(row, col, color) {
    super(row, color);
    this.col = col;
  }

  draw() {
    let block = document.createElement("div");
    block.className = "block";
    block.setAttribute("row", this.row);
    block.setAttribute("col", this.col);
    block.style.width = `${CELL}rem`;
    block.style.height = `${CELL}rem`;
    block.style.backgroundColor = this.color;
    document.getElementById("wall").appendChild(block);
  }
}
