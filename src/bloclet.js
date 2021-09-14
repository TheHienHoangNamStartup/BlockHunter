import { $, CELL } from "./constants-and-variables.js";
import * as CONST from "./constants-and-variables.js";

export default class Bloclet {
  constructor(row, color) {
    this.row = row;
    this.col;
    this.color = color;
    this.element = document.createElement("div");
  }

  setClassName(className) {
    this.element.className = className;
  }

  setRow(r) {
    this.element.setAttribute("row", r);
  }

  getRow() {
    return this.element.getAttribute("row");
  }

  setCol(c) {
    this.element.setAttribute("col", c);
  }

  getCol() {
    return this.element.getAttribute("col");
  }

  getBackgroundColor() {
    return this.element.style.backgroundColor;
  }

  setRemoved() {
    this.element.remove();
  }
}
