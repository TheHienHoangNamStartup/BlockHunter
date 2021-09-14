import { $, CELL } from "./constants-and-variables.js";
import Bloclet from "./bloclet.js";
import * as CONST from "./constants-and-variables.js";

export default class Block extends Bloclet {
  constructor(row, col, color, wallColumn, sprite) {
    super(row, color);
    this.col = col;
    this.wallColumn = wallColumn;
    this.sprite = sprite;
    this.init();
  }

  init() {
    this.setClassName("block");
    this.setRow(this.row);
    this.setCol(this.col);
    this.initStyle();
    this.setPrepended();
  }

  initStyle() {
    Object.assign(this.element.style, {
      width: `${CELL}rem`,
      height: `${CELL}rem`,
      backgroundColor: this.color,
      backgroundImage: `url(${this.sprite})`,
      marginTop: `${this.row * CELL}rem`
    });
  }

  setPrepended() {
    this.wallColumn.prepend(this.element);
  }

}
