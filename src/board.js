import { $, CELL } from "./constants.js";

export default class Board {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    let board = document.createElement("div");
    board.className = "board";

    Object.assign(board.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      padding: `${CELL}rem`,
    });

    $("body").appendChild(board);
  }
}