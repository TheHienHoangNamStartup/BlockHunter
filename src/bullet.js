import { $, CELL } from "./constants.js";
import Virus from "./virus.js";
import * as CONST from "./constants.js";

export default class Bullet extends Virus {
  constructor(row, color) {
    super(row, color);
    this.sprite = CONST.BULLET_SPRITE;
    this.init();
  }

  init() {
    this.setClassName("bullet");
    this.setRow(this.row);
    this.initStyle(this.element);
    this.setAppended(this.element);
  }

  setMarginRight(currentPosition) {
    this.element.style.marginRight = `${currentPosition + CONST.CELL}rem`;
  }

  getMarginRight() {
    return this.element.style.marginRight.slice(0, -3);
  }

  getBackgroundColor() {
    return this.element.style.backgroundColor;
  }

  setRemoved() {
    this.element.remove();
  }

  initStyle(e) {
    Object.assign(e.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      right: `${CELL}rem`,
      marginRight: `0rem`,
      marginTop: `${this.row * CELL}rem`,
    });
  }

  setAppended(e) {
    $(".board").appendChild(e);
  }

}
