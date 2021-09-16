import { $, CELL } from "./constants-and-variables.js";

export default class Board {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.element = document.createElement("div");
    this.setClassName();
    this.initStyle();
    this.setAppended();
  }

  setClassName() {
    this.element.className = "board";
  }

  initStyle() {
    Object.assign(this.element.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      marginLeft: `-${CELL}rem`,
    });
  }

  setAppended() {
    $(".wrapper").appendChild(this.element);
  }
}
