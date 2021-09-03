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
  return (CONST.$(".weapon").style.backgroundColor = randomColor());
}

// BLOCK----------------------------------------------------------------------------------------------
function createBlock(col, color, wallColumn, sprite = CONST.BLOCK_SPRITE) {
  let block = new Block(col, color, wallColumn, sprite);
  block.draw();
}

function isGoingToRemoveBullet(blockSelector, row, col) {
  let blockRow = (blockSelector.offsetTop / (16 * CONST.CELL) - 1).toString();
  if (blockRow === row && blockSelector.getAttribute("col") === col) return true;
}

function isBulletTheSamePositionAndColorAsBlockWhichHas(blockSelector, row, col, color) {
  let blockRow = (blockSelector.offsetTop / (16 * CONST.CELL) - 1).toString();
  if (blockRow === row && blockSelector.getAttribute("col") === col && blockSelector.style.backgroundColor === color)
    return true;
}

function isBulletTheSamePositionButDiffirentColorFromBlockWhichHas(blockSelector, row, col, color) {
  let blockRow = (blockSelector.offsetTop / (16 * CONST.CELL) - 1).toString();
  if (blockRow === row && blockSelector.getAttribute("col") === col && blockSelector.style.backgroundColor != color)
    return true;
}

function isBulletAtAnAvailableColumn(wallColumn) {
  if (wallColumn && wallColumn.children.length < CONST.WALL_HEIGHT) return true;
}

function isBulletAtAnUnavailableColumn(col, wallColumn) {
  if (!wallColumn && parseInt(col) < CONST.WALL_WIDTH) return true;
}

function destroyOrCreateBlock(row, col, color) {
  let blocks = CONST.$$(".block");
  let isCollision = false;
  blocks.forEach((block) => {
    let blockRow = (block.offsetTop / (16 * CONST.CELL) - 1).toString();
    if (blockRow === row && block.getAttribute("col") === col) {
      isCollision = true;
    }

    if (isBulletTheSamePositionAndColorAsBlockWhichHas(block, row, col, color)) {
      block.remove();
    }
    if (isBulletTheSamePositionButDiffirentColorFromBlockWhichHas(block, row, col, color)) {
      let wallColumn = CONST.$(`.wallColumn[col="${parseInt(col) + 1}"]`);
      if (isBulletAtAnAvailableColumn(wallColumn)) {
        createBlock(parseInt(col) + 1, color, wallColumn);
      }
      if (isBulletAtAnUnavailableColumn(col, wallColumn)) {
        let wallColumn = document.createElement("div");
        wallColumn.className = "wallColumn";
        wallColumn.setAttribute("col", parseInt(col) + 1);
        wallColumn.style.width = `${CONST.CELL}rem`;
        CONST.$(".wall").appendChild(wallColumn);
        createBlock(parseInt(col) + 1, color, wallColumn);
      }
    }
  });
  return isCollision;
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
  let duration = setInterval(() => {
    let currentPosition = parseInt(bullet.style.marginRight.slice(0, -3));
    bullet.style.marginRight = `${currentPosition + CONST.CELL}rem`;
    bullet.setAttribute("col", CONST.BOARD_WIDTH - 2 - currentPosition / CONST.CELL);
    let isCollision = destroyOrCreateBlock(
      bullet.getAttribute("row"),
      bullet.getAttribute("col"),
      bullet.style.backgroundColor
    );
    if (isCollision) {
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
function randomColor() {
  let colorValues = Object.values(CONST.COLOR);
  let randomIndex = Math.floor(Math.random() * colorValues.length);
  return colorValues[randomIndex];
}
