function randomColor() {
  return Object.values(COLOR)[Math.floor(Math.random() * Object.keys(COLOR).length)];
}

function uname() {
  let bulletsPosition = [];
  let bullets = document.getElementsByClassName("bullet");
  for (const bullet of bullets) {
    bulletsPosition.push([
      parseInt(bullet.style.marginTop.slice(0, -3)) / CELL,
      Math.ceil((CONTAINER_WIDTH * CELL - 1 - parseInt(bullet.style.marginRight.slice(0, -3))) / CELL),
    ]);
  }
  return bulletsPosition;
}

function checkCollision() {
  let blocks = document.getElementsByClassName("block");
  for (const block of blocks) {
    console.log(block.getAttribute("row"), block.getAttribute("col"));
  }
}
