import { $, CELL } from "./constants-and-variables.js";

export default class Wrapper {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.draw();
  }

  draw() {
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";

    Object.assign(wrapper.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      padding: `${CELL}rem`,
    });

    $("body").appendChild(wrapper);
  }
}
