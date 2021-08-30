class Block {
  constructor(row, col, color) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.removed = false;
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
