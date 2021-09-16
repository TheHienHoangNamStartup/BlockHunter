import { $, CELL, DEFAULT_COLOR } from "./constants-and-variables.js";

export default class Wrapper {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.color = DEFAULT_COLOR;
    this.element = document.createElement("div");
    this.setClassName();
    this.initStyle();
    this.setAppended();
  }

  setClassName() {
    this.element.className = "wrapper";
  }

  initStyle() {
    Object.assign(this.element.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      padding: `${CELL}rem`,
    });
  }

  setAppended() {
    $("body").appendChild(this.element);
  }
}
