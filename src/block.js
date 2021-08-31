class Block extends Sprite {
  constructor(row, col, color) {
    super();
    this.row = row;
    this.col = col;
    this.color = color;
    this.removed = false;
  }

  collide(target) {
    // Nếu block va chạm với tác nhân gây va chạm thì block sẽ bị gì?
    // Xử lý điều sẽ xảy ra đối với block ở đây
  }

  draw() {
    let block = document.createElement("div");
    block.className = "block";
    block.setAttribute("row", this.row);
    block.setAttribute("col", this.col);
    block.style.width = `${CELL}rem`;
    block.style.height = `${CELL}rem`;
    block.style.backgroundColor = this.color;
    document.getElementById("wall").appendChild(block);
  }
}
