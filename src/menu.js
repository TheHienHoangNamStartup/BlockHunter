import * as CONST from "./constants-and-variables.js";
import * as FUNC from "./functions.js";
import {weapon} from "./constants-and-variables.js";

function startGame() {
  FUNC.createWall(CONST.WALL_WIDTH, CONST.WALL_HEIGHT, true, CONST.BLOCKS_WIDTH);

  weapon.setVisible();
  weapon.setAppended();
  FUNC.handleWeaponMoveAndShoot();

  FUNC.gravity();
}

export function createMenu() {
  const menuItems = "Play_Options_How to play_About".split("_");
  let menu = document.createElement("div");
  menu.className = "menu";
  let menuContainer = document.createElement("div");
  menuContainer.className = "menu__container";
  menuItems.forEach((menuItemText, index) => {
    let menuItem = document.createElement("div");
    menuItem.className = "menu__item";
    menuItem.id = `menuItem${index}`;
    menuItem.textContent = menuItemText;
    menuContainer.appendChild(menuItem);
  });
  menu.appendChild(menuContainer);
  CONST.$(".board").appendChild(menu);

  handleMenuAction();
}

function hideMenu() {
  CONST.$("#menuItem0").style.animation = `hideToRight 1s ease-out forwards`;
  CONST.$("#menuItem1").style.animation = `hideToLeft 1s ease-out forwards`;
  CONST.$("#menuItem2").style.animation = `hideToRight 1s ease-out forwards`;
  CONST.$("#menuItem3").style.animation = `hideToLeft 1s ease-out forwards`;
  setTimeout(() => {
    CONST.$(".menu").remove();
    startGame();
  }, 1000);
}

function handleMenuAction() {
  CONST.$("#menuItem0").onclick = () => {
    hideMenu();
  };
}
