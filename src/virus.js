import { $, CELL } from "./constants.js";

export default class Virus {
  constructor(row, color, sprite) {
    this.row = row;
    this.col;
    this.color = color;
    this.sprite = sprite;
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
}
