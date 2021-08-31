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

export function handleWeaponMove() {
  document.onkeydown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        let topEdge = Math.max(0, getWeaponPosition() - 1) * CONST.CELL;
        CONST.$(".weapon").style.marginTop = `${topEdge}rem`;
        break;

      case "ArrowDown":
        let bottomEdge = Math.min(
          (CONST.BOARD_HEIGHT - CONST.WEAPON_HEIGHT - 2) * CONST.CELL, // -2: padding of board is 1 CELL => top + bottom = 2 CELL
          (getWeaponPosition() + 1) * CONST.CELL
        );
        CONST.$(".weapon").style.marginTop = `${bottomEdge}rem`;
        break;

      case "ArrowLeft":
        createBullet(getWeaponPosition(), getWeaponColor());
        changeWeaponColor();
        break;

      default:
        console.warn("Unset!");
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

// BULLET---------------------------------------------------------------------------------------------
function createBullet(row, color, sprite = CONST.BULLET_SPRITE) {
  let bullet = new Bullet(row, color, sprite);
  bullet.draw();
}

// OTHER----------------------------------------------------------------------------------------------
function randomColor() {
  let colorValues = Object.values(CONST.COLOR);
  let randomIndex = Math.floor(Math.random() * colorValues.length);
  return colorValues[randomIndex];
}

// function uname() {
//   let bulletsPosition = [];
//   let bullets = document.getElementsByClassName("bullet");
//   for (const bullet of bullets) {
//     bulletsPosition.push({
//       row: parseInt(bullet.style.marginTop.slice(0, -3)) / CELL,
//       col: Math.ceil((CONTAINER_WIDTH * CELL - 1 - parseInt(bullet.style.marginRight.slice(0, -3))) / CELL),
//     });
//   }
//   return bulletsPosition;
// }

// function checkCollision(array) {
//   for (const item of array) {
//     const blockTarget = document.querySelector(`.block[row="${item["row"]}"][col="${item["col"]}"]`);
//     if (blockTarget) {
//       blockTarget.style.visibility = "hidden";
//     }
//   }
// }
