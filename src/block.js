import { $, CELL } from "./constants.js";

export default class Block {
  constructor(row, col, color, wallColumn, sprite) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.wallColumn = wallColumn;
    this.sprite = sprite;
  }

  draw() {
    let block = document.createElement("div");
    block.className = "block";
    block.setAttribute("col", this.col);

    Object.assign(block.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      marginTop: `${this.row * CELL}rem`
    });

    // this.wallColumn.appendChild(block);
    this.wallColumn.prepend(block);
  }
}
