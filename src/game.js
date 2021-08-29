const container = new Container(CONTAINER_WIDTH, CONTAINER_HEIGHT);
const wall = new Wall();
const weapon = new Weapon(randomColor());

container.draw();
wall.draw();

for (let index = 0; index < WALL_WIDTH * (CONTAINER_HEIGHT - 2); index++) {
  const block = new Block(randomColor());
  block.draw();
}

weapon.draw();

document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      weapon.moveUp();
      break;

    case "ArrowDown":
      weapon.moveDown();
      break;

    case "ArrowLeft":
      const bullet = new Bullet(weapon.position() + 1, weapon.getColor());
      bullet.draw();
      bullet.shoot();
      weapon.changeColor(randomColor());
      break;

    default:
      break;
  }
});
