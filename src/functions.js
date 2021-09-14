import Board from "./board.js";
import Wall from "./wall.js";
import Block from "./block.js";
import Weapon from "./weapon.js";
import Bullet from "./bullet.js";
import * as CONST from "./constants-and-variables.js";
import * as VAR from "./constants-and-variables.js";



// BOARD-----------------------------------------------------------------------------------------------
export function createBoard(width, height, color = "#ecf0f1") {
  let board = new Board(width, height, color);
}

// WALL------------------------------------------------------------------------------------------------
export function createWall(width, height, createBlocks = true, blocksWidth = 1, color = "#ecf0f1") {
  let wall = new Wall(width + 1, height, color);

  if (createBlocks) {
    for (let col = 0; col < blocksWidth + 1; col++) {
      let wallColumn = document.createElement("div");
      wallColumn.className = "wallColumn";
      wallColumn.setAttribute("col", col);
      wallColumn.style.width = `${CONST.CELL}rem`;

      let lastColor = "";
      for (let row = 0; row < height; row++) {
        if (col == 0) {
          VAR.grid.push(new Block(height - row - 1, col, "#ecf0f1", wallColumn, ""));
        } else {
          let colorRandom = randomColor(lastColor);
          lastColor = colorRandom;
          VAR.grid.push(new Block(height - row - 1, col, colorRandom, wallColumn, CONST.BLOCK_SPRITE));
        }
      }
      CONST.$(".wall").appendChild(wallColumn);
    }
  }
}

// WEAPON----------------------------------------------------------------------------------------------

export function handleWeaponMoveAndShoot() {
  document.onkeydown = (event) => {
    if (event.key === "ArrowUp") {
      let topEdge = 0;
      let newPositionUp = VAR.weapon.getPosition() - 1;
      CONST.$(".weapon").style.marginTop = `${Math.max(topEdge, newPositionUp) * CONST.CELL}rem`;
    } else if (event.key === "ArrowDown") {
      let bottomEdge = CONST.BOARD_HEIGHT - CONST.WEAPON_HEIGHT - 2;
      let newPositionDown = VAR.weapon.getPosition() + 1;
      CONST.$(".weapon").style.marginTop = `${Math.min(bottomEdge, newPositionDown) * CONST.CELL}rem`;
    }
  };

  document.onkeyup = (event) => {
    if (event.key === " " || event.key === "ArrowLeft") {
      VAR.ammunition.push(new Bullet(VAR.weapon.getPosition(), VAR.weapon.getColor()));
      handleBulletMove();
      changeWeaponColor();
    } else if (event.key === "ArrowRight") {
      changeWeaponColor();
    }
  };
}

function getWeaponNextColor() {
  return CONST.$(".weapon").style.getPropertyValue("--nextColor");
}

function changeWeaponColor() {
  let color = getWeaponNextColor();
  let nextColor = randomColor();
  CONST.$(".weapon").style.backgroundColor = color;
  CONST.$(".weapon").style.setProperty("--color", color);
  CONST.$(".weapon").style.setProperty("--nextColor", nextColor);
}

// BLOCK----------------------------------------------------------------------------------------------
function createWallColumn(col) {
  let newWallColumn = document.createElement("div");
  newWallColumn.className = "wallColumn";
  newWallColumn.setAttribute("col", parseInt(col) + 1);
  newWallColumn.style.width = `${CONST.CELL}rem`;
  CONST.$(".wall").appendChild(newWallColumn);
  return newWallColumn;
}

function checkCollisionAndColor(blockSelector, row, col, color) {
  let blockRow = (blockSelector.offsetTop / (16 * CONST.CELL) - 1).toString();
  let isCollision = false;
  let isSameColor = false;
  if (blockRow === row && blockSelector.getAttribute("col") === col) {
    isCollision = true;
    isSameColor = blockSelector.style.backgroundColor === color;
  }
  return [isCollision, isSameColor];
}

function checkAvailableWallColumn(col) {
  let wallColumn = CONST.$(`.wallColumn[col="${parseInt(col) + 1}"]`);
  if (wallColumn && wallColumn.children.length < CONST.WALL_HEIGHT) {
    return wallColumn;
  } else if (parseInt(col) < CONST.WALL_WIDTH) {
    let newWallColumn = createWallColumn(col);
    return newWallColumn;
  }
}

function verticalCluster(wallSelector) {
  const wallColumn = Array.from(wallSelector.children);
  let len = wallColumn.length - 1;
  while (len > 0) {
    const blockColor = wallColumn[len].style.backgroundColor;
    let destroyArray = [len];
    let flag = false;
    for (var j = len - 1; j >= 0; j--) {
      if (wallColumn[j].style.backgroundColor === blockColor) {
        destroyArray.push(j);
        flag = true;
      } else {
        break;
      }
    }
    len = Math.min(len - 1, destroyArray[destroyArray.length - 1]);
    if (flag) {
      setTimeout(() => {
        destroyArray.forEach((index) => {
          removeEffect(wallColumn[index]);
        });
      }, 600);
    }
  }
}

function horizontalCluster(row, col, color, start = 0) {
  let isDestroy = false;
  for (let index = col - start; index > 0; index--) {
    const block = CONST.$(`.block[row='${row}'][col='${index}']`);
    if (block) {
      if (block.style.backgroundColor === color) {
        removeEffect(block);
        isDestroy = true;
      } else {
        isDestroy = false;
      }
    } else {
      isDestroy = false;
    }

    if (!isDestroy) {
      break;
    }
  }
}

function handleBlockAction(row, col, color) {
  let blocks = CONST.$$(".block");
  let isCollision = false;
  let isDestroy = false;

  blocks.forEach((block) => {
    let [checkCollision, checkSameColor] = checkCollisionAndColor(block, row, col, color);

    if (checkCollision) {
      isCollision = true;

      if (checkSameColor) {
        removeEffect(block);

        isDestroy = true;
      } else {
        let wallColumn = checkAvailableWallColumn(col);

        if (wallColumn) {
          VAR.grid.push(new Block(row, parseInt(col) + 1, color, wallColumn, CONST.BLOCK_SPRITE));
        }
      }
    }
  });
  return [isCollision, isDestroy];
}

function updateBlockRow() {
  const blocks = Array.from(CONST.$$(".block"));
  blocks.forEach((block) => {
    block.setAttribute("row", `${parseInt(block.style.marginTop.slice(0, -3) / CONST.CELL)}`);
  });
}

// function checkVertical(row, col, color) {
//   const block = CONST.$(`.block[row="${1 * row + 1}"][col="${1 * col + 1}"]`);
//   if (block) {
//     if (block.style.backgroundColor === color) {
//       removeEffect(block);
//     }
//   }
// }

// BULLET---------------------------------------------------------------------------------------------
function handleBulletMove() {
  let bullet = VAR.ammunition[VAR.ammunition.length - 1];
  let step = 50;
  let duration = setInterval(() => {
    let currentPosition = parseInt(bullet.getMarginRight());
    bullet.setMarginRight(currentPosition);
    bullet.setCol(CONST.BOARD_WIDTH - 2 - currentPosition / CONST.CELL);
    let [isCollision, isDestroy] = handleBlockAction(bullet.getRow(), bullet.getCol(), bullet.getBackgroundColor());
    if (isCollision) {
      clearInterval(duration);
      horizontalCluster(bullet.getRow(), bullet.getCol(), bullet.getBackgroundColor(), Number(isDestroy));
      // checkVertical(bullet.getRow(), bullet.getCol(), bullet.getBackgroundColor());
      bullet.setRemoved();
    }
  }, step);
}

// OTHER----------------------------------------------------------------------------------------------
export function gravity() {
  setInterval(() => {
    const wall = Array.from(CONST.$(".wall").children);
    for (var i = 1; i < wall.length; i++) {
      const wallColumn = Array.from(wall[i].children);
      wallColumn.forEach((block, index) => {
        const number = wallColumn.length - index - 1;
        block.style.marginTop = `${(CONST.WALL_HEIGHT - number - 1) * CONST.CELL}rem`;
      });
      updateBlockRow();
      verticalCluster(wall[i]);
      checkWin();
    }
  }, 100);
}

export function randomColor(except = "") {
  let colorValues = Object.values(CONST.COLOR);
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * colorValues.length);
  } while (colorValues[randomIndex] === except);
  return colorValues[randomIndex];
}

function removeEffect(block) {
  const delay = 300;
  block.style.animation = `blink ${delay}ms ease-in-out forwards`;
  setTimeout(() => {
    block.remove();
  }, delay);
}

function checkWin() {
  const blocks = Array.from(CONST.$$(".block"));
  let countBlocks = 0;
  blocks.forEach((block) => {
    if (block.style.backgroundColor !== "rgb(236, 240, 241)") {
      countBlocks++;
    }
  });
  if (countBlocks === 0) {
    alert("You won!");
  }
}
