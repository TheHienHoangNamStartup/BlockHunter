import { $, CELL } from "./constants.js";

export default class Bullet {
  constructor(row, color, sprite) {
    this.row = row;
    this.col;
    this.color = color;
    this.sprite = sprite;
    this.bullet = document.createElement("div");
    this.init();
  }

  init() {
    this.setClassName("bullet");
    this.setRow();
    this.setStyle();
    this.setAppended();
  }

  setClassName(className) {
    this.bullet.className = className;
  }

  setRow() {
    this.bullet.setAttribute("row", this.row);
  }

  getRow() {
    return this.bullet.getAttribute("row");
  }

  setCol() {
    this.bullet.setAttribute("col", this.col);
  }

  getCol() {
    return this.bullet.getAttribute("col");
  }

  setStyle() {
    Object.assign(this.bullet.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      right: `${CELL}rem`,
      marginRight: `0rem`,
      marginTop: `${this.row * CELL}rem`,
    });
  }

  setAppended() {
    $(".board").appendChild(this.bullet);
  }

}
