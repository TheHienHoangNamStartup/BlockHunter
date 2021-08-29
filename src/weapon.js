class Weapon {
  constructor(color) {
    this.color = color;
  }

  draw() {
    let weapon = document.createElement("div");
    weapon.id = "weapon";
    weapon.style.marginTop = "0rem";
    weapon.style.width = `${CELL}rem`;
    weapon.style.height = `${CELL * 3}rem`;
    weapon.style.right = `${CELL}rem`;
    weapon.style.backgroundColor = this.color;
    document.getElementById("container").appendChild(weapon);
  }

  init() {
    return document.getElementById("weapon");
  }

  position() {
    return parseInt(this.init().style.marginTop.slice(0, -3)) / CELL; // row
  }

  changeColor(color) {
    this.init().style.backgroundColor = color;
  }

  getColor() {
    return this.init().style.backgroundColor;
  }

  moveUp() {
    this.init().style.marginTop = `${Math.max(0, (this.position() - 1) * CELL)}rem`;
  }

  moveDown() {
    this.init().style.marginTop = `${Math.min((CONTAINER_HEIGHT - 3) * CELL, (this.position() + 1) * CELL)}rem`;
  }
}
