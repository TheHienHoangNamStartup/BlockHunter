import { $, CELL } from "./constants.js";

export default class Bullet {
  constructor(row, color, sprite) {
    this.row = row;
    this.color = color;
    this.sprite = sprite;
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

  // get elements() {
  //   return document.getElementsByClassName("bullet");
  // }

  // shoot() {
  //   let e = this.elements[this.elements.length - 1];
  //   let timer = setInterval(() => {
  //     let marginRightCurrent = parseInt(e.style.marginRight.slice(0, -3));
  //     e.style.marginRight = `${marginRightCurrent + CELL}rem`;
  //   }, 20);
  //   setTimeout(() => {
  //     clearInterval(timer);
  //     setTimeout(() => {
  //       e.remove();
  //     }, 1000);
  //   }, 20 * CONTAINER_WIDTH);
  // }
}
