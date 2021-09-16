import Wrapper from "./wrapper.js";
import Board from "./board.js";
import Block from "./block.js";
import Weapon from "./weapon.js";
import Bullet from "./bullet.js";
import * as CONST from "./constants-and-variables.js";
import {weapon, wall, ammunition} from "./constants-and-variables.js";

// BOARD------------------------------------------------------------------------------------------------
export function createBoard(width, height, createBlocks = true, blocksWidth = 1, color = "#ecf0f1") {
  let board = new Board(width + 1, height, color);

  if (createBlocks) {
    for (let col = 0; col < blocksWidth + 1; col++) {
      let boardColumn = document.createElement("div");
      boardColumn.className = "boardColumn";
      boardColumn.setAttribute("col", col);
      boardColumn.style.width = `${CONST.CELL}rem`;

      let lastColor = "";
      for (let row = 0; row < height; row++) {
        if (col == 0) {
          wall.push(new Block(height - row - 1, col, "#ecf0f1", boardColumn, ""));
        } else {
          let colorRandom = randomColor(lastColor);
          lastColor = colorRandom;
          wall.push(new Block(height - row - 1, col, colorRandom, boardColumn, CONST.BLOCK_SPRITE));
        }
      }
      CONST.$(".board").appendChild(boardColumn);
    }
  }
}

// WEAPON----------------------------------------------------------------------------------------------
export function handleWeaponMoveAndShoot() {
  document.onkeydown = (event) => {
    if (event.key === "ArrowUp") {
      weapon.moveUp();
    } else if (event.key === "ArrowDown") {
      weapon.moveDown();
    }
  };

  document.onkeyup = (event) => {
    if (event.key === " " || event.key === "ArrowLeft") {
      ammunition.push(new Bullet(weapon.getPosition(), weapon.getColor()));
      handleBulletMove();
      weapon.changeColors();
    } else if (event.key === "ArrowRight") {
      weapon.changeColors();
    }
  };
}

// BLOCK----------------------------------------------------------------------------------------------
function createBoardColumn(col) {
  let newBoardColumn = document.createElement("div");
  newBoardColumn.className = "boardColumn";
  newBoardColumn.setAttribute("col", parseInt(col) + 1);
  newBoardColumn.style.width = `${CONST.CELL}rem`;
  CONST.$(".board").appendChild(newBoardColumn);
  return newBoardColumn;
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

function checkAvailableBoardColumn(col) {
  let boardColumn = CONST.$(`.boardColumn[col="${parseInt(col) + 1}"]`);
  if (boardColumn && boardColumn.children.length < CONST.BOARD_HEIGHT) {
    return boardColumn;
  } else if (parseInt(col) < CONST.BOARD_WIDTH) {
    let newBoardColumn = createBoardColumn(col);
    return newBoardColumn;
  }
}

function verticalCluster(boardSelector) {
  const boardColumn = Array.from(boardSelector.children);
  let len = boardColumn.length - 1;
  while (len > 0) {
    const blockColor = boardColumn[len].style.backgroundColor;
    let destroyArray = [len];
    let flag = false;
    for (var j = len - 1; j >= 0; j--) {
      if (boardColumn[j].style.backgroundColor === blockColor) {
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
          removeEffect(boardColumn[index]);
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
        let boardColumn = checkAvailableBoardColumn(col);

        if (boardColumn) {
          wall.push(new Block(row, parseInt(col) + 1, color, boardColumn, CONST.BLOCK_SPRITE));
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
  let bullet = ammunition[ammunition.length - 1];
  let step = 50;
  let duration = setInterval(() => {
    let currentPosition = parseInt(bullet.getMarginRight());
    bullet.setMarginRight(currentPosition);
    bullet.setCol(CONST.WRAPPER_WIDTH - 2 - currentPosition / CONST.CELL);
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
    const board = Array.from(CONST.$(".board").children);
    for (var i = 1; i < board.length; i++) {
      const boardColumn = Array.from(board[i].children);
      boardColumn.forEach((block, index) => {
        const number = boardColumn.length - index - 1;
        block.style.marginTop = `${(CONST.BOARD_HEIGHT - number - 1) * CONST.CELL}rem`;
      });
      updateBlockRow();
      verticalCluster(board[i]);
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
