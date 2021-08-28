const container = new Container(CONTAINER_WIDTH, CONTAINER_HEIGHT);
const weapon = new Weapon();

container.draw();
weapon.draw();
weapon.changeColor(randomColor());

document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      weapon.moveUp();
      break;

    case "ArrowDown":
      weapon.moveDown();
      break;

    case "ArrowLeft":
      const bullet = new Bullet(weapon.position() + 1, weapon.color());
      bullet.draw();
      bullet.shoot();
      weapon.changeColor(randomColor());
      break;

    default:
      break;
  }
});
