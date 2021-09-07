import { $, CELL } from "./constants.js";

class Virus {
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

export default class Block extends Virus{
  constructor(row, col, color, wallColumn, sprite) {
    super(row, color, sprite);
    this.col = col;
    this.wallColumn = wallColumn;
    this.init();
  }

  init() {
    this.setClassName("block");
    this.setRow(this.row);
    this.setCol(this.col);
    this.setStyle(this.element);
    this.setPrepended(this.element);
  }

  setStyle(e) {
    Object.assign(e.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      marginTop: `${this.row * CELL}rem`
    });
  }

  setPrepended(e) {
    this.wallColumn.prepend(e);
  }

}
