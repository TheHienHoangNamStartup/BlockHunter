function randomColor() {
  return Object.values(COLOR)[Math.floor(Math.random() * Object.keys(COLOR).length)];
}

function uname() {
  let bulletsPosition = [];
  let bullets = document.getElementsByClassName("bullet");
  for (const bullet of bullets) {
    bulletsPosition.push({
      row: parseInt(bullet.style.marginTop.slice(0, -3)) / CELL,
      col: Math.ceil((CONTAINER_WIDTH * CELL - 1 - parseInt(bullet.style.marginRight.slice(0, -3))) / CELL),
    });
  }
  return bulletsPosition;
}

function checkCollision(array) {
  for (const item of array) {
    const blockTarget = document.querySelector(`.block[row="${item["row"]}"][col="${item["col"]}"]`);
    if (blockTarget) {
      blockTarget.style.visibility = "hidden";
    }
  }
}
