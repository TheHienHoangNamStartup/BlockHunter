import { $, CELL } from "./constants.js";

export default class Block {
  constructor(row, col, color, sprite) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.sprite = sprite;
  }

  draw() {
    let block = document.createElement("div");
    block.className = "block";

    block.setAttribute("row", this.row);
    block.setAttribute("col", this.col);

    Object.assign(block.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
    });

    $(".wall").appendChild(block);
  }
}
