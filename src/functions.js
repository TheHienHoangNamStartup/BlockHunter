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
export function createWall(width, height, createBlocks = true, color = "#ecf0f1") {
  let wall = new Wall(width, height, color);
  wall.draw();

  if (createBlocks) {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        createBlock(row, col, randomColor());
      }
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
    switch (event.key) {
      case "ArrowUp":
        let topEdge = 0;
        let newPositionUp = getWeaponPosition() - 1;
        CONST.$(".weapon").style.marginTop = `${Math.max(topEdge, newPositionUp) * CONST.CELL}rem`;
        break;

      case "ArrowDown":
        let bottomEdge = CONST.BOARD_HEIGHT - CONST.WEAPON_HEIGHT - 2;
        let newPositionDown = getWeaponPosition() + 1;
        CONST.$(".weapon").style.marginTop = `${Math.min(bottomEdge, newPositionDown) * CONST.CELL}rem`;
        break;

      case " ":
      case "ArrowLeft":
        createBullet(getWeaponPosition(), getWeaponColor());
        handleBulletMove();
        changeWeaponColor();
        break;

      default:
        break;
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
function createBlock(row, col, color, sprite = CONST.BLOCK_SPRITE) {
  let block = new Block(row, col, color, sprite);
  block.draw();
}

function destroyBlock(row, col, color) {
  let blocks = CONST.$$(".block");
  blocks.forEach((block) => {
    if (
      block.getAttribute("row") === row &&
      block.getAttribute("col") === col &&
      block.style.backgroundColor === color
    ) {
      block.style.opacity = "0";
    }
  });
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
    destroyBlock(bullet.getAttribute("row"), bullet.getAttribute("col"), bullet.style.backgroundColor);
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
