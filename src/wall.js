import { $, CELL } from "./constants.js";

export default class Wall {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    let wall = document.createElement("div");
    wall.className = "wall";

    Object.assign(wall.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
    });

    $(".board").appendChild(wall);
  }
}
