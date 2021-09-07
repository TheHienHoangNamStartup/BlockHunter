import { $, CELL } from "./constants.js";



export default class Block extends element{
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
