import { $, CELL, BOARD_WIDTH } from "./constants-and-variables.js";

export default class Weapon {
  constructor(width, height, color, nextColor) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.nextColor = nextColor;
    // this.sprite = sprite;
    this.element = document.createElement("div");
    this.init();
  }

  init() {
    this.setClassName();
    this.initStyle();
    this.setAppended();
  }

  setClassName() {
    this.element.className = "weapon";
  }

  initStyle() {
    this.element.style.setProperty("--width", `${(BOARD_WIDTH - 3) * CELL}rem`);
    this.element.style.setProperty("--margin", `${CELL}rem`);
    this.element.style.setProperty("--color", this.color);
    this.element.style.setProperty("--nextColor", this.nextColor);

    Object.assign(this.element.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      // backgroundImage: `url(${this.sprite})`,
      marginTop: `0rem`,
    });
  }

  setAppended() {
    $(".board").appendChild(this.element);
  }
}
