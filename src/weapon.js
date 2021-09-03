import { $, CELL, BOARD_WIDTH } from "./constants.js";

export default class Weapon {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    // this.sprite = sprite;
  }

  draw() {
    let weapon = document.createElement("div");
    weapon.className = "weapon";

    weapon.style.setProperty("--width", `${(BOARD_WIDTH - 3) * CELL}rem`);
    weapon.style.setProperty("--color", this.color);
    weapon.style.setProperty("--margin", `${CELL}rem`);

    Object.assign(weapon.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      // backgroundImage: `url(${this.sprite})`,
      marginTop: `0rem`,
    });

    $(".board").appendChild(weapon);
  }
}
