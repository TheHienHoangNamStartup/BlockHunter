import { $, CELL } from "./constants-and-variables.js";

export default class Board {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.draw();
  }

  draw() {
    let board = document.createElement("div");
    board.className = "board";

    Object.assign(board.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      marginLeft: `-${CELL}rem`,
    });

    $(".wrapper").appendChild(board);
  }
}
