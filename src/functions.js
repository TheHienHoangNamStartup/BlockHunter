import Board from "./board.js";
import Wall from "./wall.js";
import Block from "./block.js";
import Weapon from "./weapon.js";
import Bullet from "./bullet.js";
import * as CONST from "./constants.js";

// BOARD-----------------------------------------------------------------------------------------------
export function createBoard(width, height, color = "#ecf0f1") {
  let board = new Board(width, height, color);
  board.draw();
}

// WALL------------------------------------------------------------------------------------------------
export function createWall(width, height, createBlocks = true, blocksWidth = 1, color = "#ecf0f1") {
  let wall = new Wall(width + 1, height, color);
  wall.draw();

  if (createBlocks) {
    for (let col = 0; col < blocksWidth + 1; col++) {
      let wallColumn = document.createElement("div");
      wallColumn.className = "wallColumn";
      wallColumn.setAttribute("col", col);
      wallColumn.style.width = `${CONST.CELL}rem`;
      for (let row = 0; row < height; row++) {
        if (col == 0) {
          createBlock(col, "#ecf0f1", wallColumn, "");
        } else {
          createBlock(col, randomColor(), wallColumn);
        }
      }
      CONST.$(".wall").appendChild(wallColumn);
    }
  }
}

// WEAPON----------------------------------------------------------------------------------------------
export function createWeapon() {
  let weapon = new Weapon(CONST.WEAPON_WIDTH, CONST.WEAPON_HEIGHT, randomColor());
  weapon.draw();
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
      createBullet(getWeaponPosition(), getWeaponColor());
      handleBulletMove();
      changeWeaponColor();
    }
  };
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

// BLOCK----------------------------------------------------------------------------------------------
function createBlock(col, color, wallColumn, sprite = CONST.BLOCK_SPRITE) {
  let block = new Block(col, color, wallColumn, sprite);
  block.draw();
}

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

function cluster(color, wallSelector) {
  const array = Array.from(wallSelector.children);
  let flag = false;
  for (let index = 1; index < array.length; index++) {
    if (array[index].style.backgroundColor === color) {
      flag = true;
      array[index].remove();
    } else {
      break;
    }
  }
  if (flag) {
    array[0].remove();
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
          createBlock(parseInt(col) + 1, color, wallColumn);
          cluster(color, wallColumn);
        }
      }
    }
  });
  return [isCollision, isDestroy];
}

// BULLET---------------------------------------------------------------------------------------------
function createBullet(row, color, sprite = CONST.BULLET_SPRITE) {
  let bullet = new Bullet(row, color, sprite);
  bullet.draw();
}

function handleBulletMove() {
  let bullets = CONST.$$(".bullet");
  let bullet = bullets[bullets.length - 1];
  let step = 50;
  let isAdd = true;
  let duration = setInterval(() => {
    let currentPosition = parseInt(bullet.style.marginRight.slice(0, -3));
    bullet.style.marginRight = `${currentPosition + CONST.CELL}rem`;
    bullet.setAttribute("col", CONST.BOARD_WIDTH - 2 - currentPosition / CONST.CELL);
    let [isCollision, isDestroy] = handleBlockAction(
      bullet.getAttribute("row"),
      bullet.getAttribute("col"),
      bullet.style.backgroundColor,
      isAdd
    );
    isAdd = !isDestroy;
    if (isCollision && !isDestroy) {
      clearInterval(duration);
      bullet.remove();
    }
  }, step);
  setTimeout(() => {
    clearInterval(duration);
    bullet.remove();
  }, step * CONST.BOARD_WIDTH);
}

// OTHER----------------------------------------------------------------------------------------------
export function gravity() {
  const array = Array.from(CONST.$(".wall").children);
  console.log(array);
  for (let i = 1; i < array.length; i++) {
    const arrayChildren = Array.from(array[i].children);
    for (let j = 0; j < arrayChildren.length; j++) {
      console.log(arrayChildren[j].offsetTop);
    }
  }
}

function randomColor() {
  let colorValues = Object.values(CONST.COLOR);
  let randomIndex = Math.floor(Math.random() * colorValues.length);
  return colorValues[randomIndex];
}
