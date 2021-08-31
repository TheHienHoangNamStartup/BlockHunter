class Weapon extends Sprite {
  constructor(color) {
    super();
    this.color = color;
  }

  draw() {
    let weapon = document.createElement("div");
    weapon.id = "weapon";
    weapon.style.marginTop = "0rem";
    weapon.style.backgroundColor = this.color;
    document.getElementById("container").appendChild(weapon);
  }

  get element() {
    return document.getElementById("weapon");
  }

  position() {
    return parseInt(this.element.style.marginTop.slice(0, -3)) / CELL; // row
  }

  setColor(color) {
    this.color = color; // maybe not necessary
    this.element.style.backgroundColor = this.color;
  }

  // changeColor(color) {
  //   this.element.style.backgroundColor = color;
  // }

  getColor() {
    return this.element.style.backgroundColor;
  }

  moveUp() {
    this.element.style.marginTop = `${Math.max(0, (this.position() - 1) * CELL)}rem`;
  }

  moveDown() {
    this.element.style.marginTop = `${Math.min((CONTAINER_HEIGHT - 3) * CELL, (this.position() + 1) * CELL)}rem`;
  }
}
