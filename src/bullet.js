class Bullet {
  constructor(row, color) {
    this.row = row;
    this.color = color;
  }

  draw() {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.backgroundColor = this.color;
    bullet.style.marginTop = `${this.row * CELL}rem`;
    bullet.style.marginRight = `0rem`;
    document.getElementById("container").appendChild(bullet);
  }

  get elements() {
    return document.getElementsByClassName("bullet");
  }

  shoot() {
    let e = this.elements[this.elements.length - 1];
    let timer = setInterval(() => {
      let marginRightCurrent = parseInt(e.style.marginRight.slice(0, -3));
      e.style.marginRight = `${marginRightCurrent + CELL}rem`;
    }, 20);
    setTimeout(() => {
      clearInterval(timer);
      setTimeout(() => {
        e.remove();
      }, 1000);
    }, 20 * CONTAINER_WIDTH);
  }
}
