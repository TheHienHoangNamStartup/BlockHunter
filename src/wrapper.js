import { $, CELL } from "./constants-and-variables.js";

export default class Wrapper {
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
