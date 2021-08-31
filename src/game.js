const container = new Container(CONTAINER_WIDTH, CONTAINER_HEIGHT);
const wall = new Wall();
const weapon = new Weapon(randomColor());

container.draw();
wall.draw();

// for (let index = 0; index < WALL_WIDTH * (CONTAINER_HEIGHT - 2); index++) {
//   const block = new Block(randomColor());
//   block.draw();
// }

for (let row = 1; row <= CONTAINER_HEIGHT - 2; row++) {
  for (let col = 1; col <= WALL_WIDTH; col++) {
    const block = new Block(row, col, randomColor());
    block.draw();
  }
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
      weapon.setColor(randomColor());
      break;

    default:
      break;
  }
});

// document.onclick = function () {
//   //
//   console.log(uname());
//   // checkCollision();
// };
setInterval(() => {
  // console.log(uname());
  checkCollision(uname());
}, 20);
