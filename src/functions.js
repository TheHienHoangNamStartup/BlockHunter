import Board from "./board.js";
import Wall from "./wall.js";
import Block from "./block.js";
import Weapon from "./weapon.js";
import Bullet from "./bullet.js";
import * as CONST from "./constants.js";

var ammunition = [];
var grid = [];

// WEAPON----------------------------------------------------------------------------------------------
export function createWeapon() {
  let weapon = new Weapon(CONST.WEAPON_WIDTH, CONST.WEAPON_HEIGHT, randomColor());
}

function getWeaponPosition() {
  return parseInt(CONST.$(".weapon").style.marginTop.slice(0, -3)) / CONST.CELL; // return row
}

function getWeaponColor() {
  return CONST.$(".weapon").style.backgroundColor;
}

function changeWeaponColor() {
  let colorRandom = randomColor();
  CONST.$(".weapon").style.backgroundColor = colorRandom;
  CONST.$(".weapon").style.setProperty("--color", colorRandom);
}

export function handleWeaponMoveAndShoot() {
  document.onkeydown = (event) => {
    if (event.key === "ArrowUp") {
      let topEdge = 0;
      let newPositionUp = getWeaponPosition() - 1;
      CONST.$(".weapon").style.marginTop = `${Math.max(topEdge, newPositionUp) * CONST.CELL}rem`;
    } else if (event.key === "ArrowDown") {
      let bottomEdge = CONST.BOARD_HEIGHT - CONST.WEAPON_HEIGHT - 2;
      let newPositionDown = getWeaponPosition() + 1;
      CONST.$(".weapon").style.marginTop = `${Math.min(bottomEdge, newPositionDown) * CONST.CELL}rem`;
    }
  };

  document.onkeyup = (event) => {
    if (event.key === " " || event.key === "ArrowLeft") {
      ammunition.push(new Bullet(getWeaponPosition(), getWeaponColor()));
      handleBulletMove();
      changeWeaponColor();
    }
  };
}

// BULLET---------------------------------------------------------------------------------------------
function handleBulletMove() {
  let bullet = ammunition[ammunition.length - 1];
  let step = 50;
  let isAdd = true;
  let duration = setInterval(() => {
    let currentPosition = parseInt(bullet.getMarginRight());
    bullet.setMarginRight(currentPosition);
    bullet.setCol(CONST.BOARD_WIDTH - 2 - currentPosition / CONST.CELL);
    let [isCollision, isDestroy] = handleBlockAction(
      bullet.getRow(),
      bullet.getCol(),
      bullet.getBackgroundColor(),
      isAdd
    );
    isAdd = !isDestroy;
    if (isCollision && !isDestroy) {
      clearInterval(duration);
      bullet.setRemoved();
    }
  }, step);
  setTimeout(() => {
    clearInterval(duration);
    bullet.setRemoved();
  }, step * CONST.BOARD_WIDTH);
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

function cluster(wallSelector) {
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
        }
        else {
          break;
        }
      }
    len = Math.min(len - 1, destroyArray[destroyArray.length - 1]);
    if (flag) {
      setTimeout(() => {
        destroyArray.forEach((index) => {
          wallColumn[index].remove();
        })
      }, 600)
    }
  }
}

function handleBlockAction(row, col, color, isAdd) {
  let blocks = CONST.$$(".block");
  let isCollision = false;
  let isDestroy = false;

  blocks.forEach((block) => {
    let [checkCollision, checkSameColor] = checkCollisionAndColor(block, row, col, color);

    if (checkCollision) {
      isCollision = true;

      if (checkSameColor) {
        block.remove();
        isDestroy = true;
      } else if (isAdd) {
        let wallColumn = checkAvailableWallColumn(col);

        if (wallColumn) {
          grid.push(new Block(row, parseInt(col) + 1, color, wallColumn));
        }
      }
    }
  });
  return [isCollision, isDestroy];
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
      for (let row = 0; row < height; row++) {
        if (col == 0) {
          // let blockZero = new Block (height - row - 1, col, "#ecf0f1", wallColumn);
          // blockZero.setSprite("");
        } else {
          grid.push(new Block(height - row - 1, col, randomColor(), wallColumn));
        }
      }
      CONST.$(".wall").appendChild(wallColumn);
    }
  }
}

// BOARD-----------------------------------------------------------------------------------------------
export function createBoard(width, height, color = "#ecf0f1") {
  let board = new Board(width, height, color);
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
      })
      cluster(wall[i]);
    }
  }, 100)
}

function randomColor() {
  let colorValues = Object.values(CONST.COLOR);
  let randomIndex = Math.floor(Math.random() * colorValues.length);
  return colorValues[randomIndex];
}
