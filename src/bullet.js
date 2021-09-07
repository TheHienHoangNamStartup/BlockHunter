import { $, CELL } from "./constants.js";

export default class Bullet {
  constructor(row, color, sprite) {
    this.row = row;
    this.color = color;
    this.sprite = sprite;
    this.draw();
  }

  draw() {
    let bullet = document.createElement("div");
    bullet.className = "bullet";

    bullet.setAttribute("row", this.row);

    Object.assign(bullet.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      right: `${CELL}rem`,
      marginRight: `0rem`,
      marginTop: `${this.row * CELL}rem`,
    });

    $(".board").appendChild(bullet);
  }
}
