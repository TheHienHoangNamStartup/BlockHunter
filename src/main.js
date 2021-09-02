import * as CONST from "./constants.js";
import * as FUNC from "./functions.js";

function gameControl() {
  FUNC.createBoard(CONST.BOARD_WIDTH, CONST.BOARD_HEIGHT);

  FUNC.createWall(CONST.WALL_WIDTH, CONST.WALL_HEIGHT);

  FUNC.createWeapon();
  FUNC.handleWeaponMoveAndShoot();
}

gameControl();
