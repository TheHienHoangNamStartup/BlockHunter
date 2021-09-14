import { $, CELL } from "./constants-and-variables.js";
import Bloclet from "./bloclet.js";
import * as CONST from "./constants-and-variables.js";

export default class Bullet extends Bloclet {
  constructor(row, color) {
    super(row, color);
    this.sprite = CONST.BULLET_SPRITE;
    this.init();
  }

  init() {
    this.setClassName("bullet");
    this.setRow(this.row);
    this.initStyle();
    this.setAppended();
  }

  setMarginRight(currentPosition) {
    this.element.style.marginRight = `${currentPosition + CONST.CELL}rem`;
  }

  getMarginRight() {
    return this.element.style.marginRight.slice(0, -3);
  }

  initStyle() {
    Object.assign(this.element.style, {
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
    $(".board").appendChild(this.element);
  }

}
