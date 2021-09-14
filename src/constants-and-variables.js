export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const CELL = 2;

export const BOARD_WIDTH = 22;
export const BOARD_HEIGHT = 17;

export const WALL_WIDTH = 10;
export const WALL_HEIGHT = 15;

export const BLOCKS_WIDTH = 5;

export const WEAPON_WIDTH = 1;
export const WEAPON_HEIGHT = 1;

export const BLOCK_SPRITE = "./assets/images/covid.png";
export const BULLET_SPRITE = "./assets/images/covid.png";
// export const WEAPON_SPRITE = "./assets/images/....png";

export const COLOR = {
  red: "rgb(231, 76, 60)",
  yellow: "rgb(241, 196, 15)",
  blue: "rgb(52, 152, 219)",
  green: "rgb(46, 204, 113)",
  purple: "rgb(155, 89, 182)",
};

export var ammunition = [];
export var grid = [];
