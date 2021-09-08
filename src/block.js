import { $, CELL } from "./constants.js";
import Virus from "./virus.js";
import * as CONST from "./constants.js";

export default class Block extends Virus{
  constructor(row, col, color, wallColumn) {
    super(row, color);
    this.col = col;
    this.wallColumn = wallColumn;
    this.sprite = CONST.BLOCK_SPRITE;
    this.init();
  }

  init() {
    this.setClassName("block");
    this.setRow(this.row);
    this.setCol(this.col);
    this.initStyle();
    this.setPrepended();
  }

  setSprite(s) {
    this.sprite = s;
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
