const container = new Container(CONTAINER_WIDTH, CONTAINER_HEIGHT);
const weapon = new Weapon();

container.draw();
weapon.draw();
weapon.changeColor(COLOR["red"]);



document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      weapon.moveUp();
      break;

    case "ArrowDown":
      weapon.moveDown();
      break;

    default:
      break;
  }
});
