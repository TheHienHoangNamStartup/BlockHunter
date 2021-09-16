import { $, CELL, WRAPPER_WIDTH } from "./constants-and-variables.js";
import * as CONST from "./constants-and-variables.js";
import * as FUNC from "./functions.js";

export default class Weapon {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.color = FUNC.randomColor();
    this.nextColor = FUNC.randomColor();
    // this.sprite = sprite;
    this.element = document.createElement("div");
    this.setClassName();
    this.initStyle();
    this.activateColors();
  }

  setClassName() {
    this.element.className = "weapon";
  }

  initStyle() {
    this.element.style.setProperty("--width", `${(WRAPPER_WIDTH - 3) * CELL}rem`);
    this.element.style.setProperty("--margin", `${CELL}rem`);

    Object.assign(this.element.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      // backgroundImage: `url(${this.sprite})`,
      marginTop: `0rem`,
    });
  }

  setAppended() {
    $(".wrapper").appendChild(this.element);
  }

  setHidden() {
    this.element.style.display = "none";
  }

  setVisible() {
    this.element.style.display = "block";
  }

  getPosition() {
    return parseInt(this.element.style.marginTop.slice(0, -3)) / CONST.CELL; // return row
  }

  moveUp() {
    let topEdge = 0;
    let newPositionUp = this.getPosition() - 1;
    this.element.style.marginTop = `${Math.max(topEdge, newPositionUp) * CONST.CELL}rem`;
  }

  moveDown() {
    let bottomEdge = CONST.WRAPPER_HEIGHT - CONST.WEAPON_HEIGHT - 2;
    let newPositionDown = this.getPosition() + 1;
    this.element.style.marginTop = `${Math.min(bottomEdge, newPositionDown) * CONST.CELL}rem`;
  }

  getColor() {
    return this.color;
  }

  activateColors() {
    this.element.style.backgroundColor = this.color;
    this.element.style.setProperty("--nextColor", this.nextColor);
    this.element.style.setProperty("--color", this.color);
  }

  changeColors() {
    this.color = this.nextColor;
    this.nextColor = FUNC.randomColor();
    this.activateColors();
  }
}
