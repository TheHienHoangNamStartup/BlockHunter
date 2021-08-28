class Bullet {
  constructor(color) {
    this.color = color;
  }

  

  draw() {
    let bullet = document.createElement("div");
    bullet.style.width = `${CELL}rem`;
    bullet.style.height = `${CELL}rem`;
    bullet.style.backgroundColor = this.color;
    document.getElementById("weapon").appendChild(bullet);
  }
}
