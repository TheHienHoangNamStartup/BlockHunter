import { $, CELL } from "./constants-and-variables.js";

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.color = "#ecf0f1";
    this.element = document.createElement("div");
    this.setClassName();
    this.initStyle();
    this.setAppended();
  }

  setClassName() {
    this.element.className = "board";
  }

  initStyle() {
    Object.assign(this.element.style, {
      width: `${this.width * CELL}rem`,
      height: `${this.height * CELL}rem`,
      backgroundColor: this.color,
      marginLeft: `-${CELL}rem`,
    });
  }

  setAppended() {
    $(".wrapper").appendChild(this.element);
  }

  newColumn(col) {
    let boardColumn = document.createElement("div");
    boardColumn.className = "boardColumn";
    boardColumn.setAttribute("col", col);
    boardColumn.style.width = `${CELL}rem`;
    return boardColumn;
  }
}
