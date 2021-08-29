class Bullet {
  constructor(row, color) {
    this.row = row;
    this.color = color;
  }

  draw() {
    let bullet = document.createElement("div");
    bullet.style.width = `${CELL}rem`;
    bullet.style.height = `${CELL}rem`;
    bullet.className = "bullet";
    bullet.style.backgroundColor = this.color;
    bullet.style.marginTop = `${this.row * CELL}rem`;
    bullet.style.marginRight = `0rem`;
    document.getElementById("container").appendChild(bullet);
  }

  shoot() {
    let bullets = document.getElementsByClassName("bullet");
    let bullet = bullets[bullets.length - 1];
    let timer = setInterval(() => {
      let marginRightCurrent = parseInt(bullet.style.marginRight.slice(0, -3));
      bullet.style.marginRight = `${marginRightCurrent + 1}rem`;
    }, 20);
    setTimeout(() => {
      clearInterval(timer);
      setTimeout(() => {
        bullet.remove();
      }, 1000);
    }, 20 * (CONTAINER_WIDTH - 1) * CELL);
  }
}
