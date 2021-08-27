class Weapon {
  draw() {
    let weapon = document.createElement("div");
    weapon.id = "weapon";
    weapon.style.marginTop = "0rem";
    weapon.style.width = `${CELL}rem`;
    weapon.style.height = `${3 * CELL}rem`;
    weapon.style.right = `${CELL}rem`;
    document.getElementById("container").appendChild(weapon);
  }

  init() {
    return document.getElementById("weapon");
  }

  position() {
    return parseInt(this.init().style.marginTop.slice(0, -3));
  }

  changeColor(color) {
    this.init().style.backgroundColor = color;
  }

  moveUp() {
    this.init().style.marginTop = `${Math.max(0, this.position() - CELL)}rem`;
  }

  moveDown() {
    this.init().style.marginTop = `${Math.min((CONTAINER_HEIGHT - 3) * CELL, this.position() + CELL)}rem`;
  }
}
