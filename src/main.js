import { createMenu } from "./menu.js";
import { createBoard } from "./functions.js";
import { WRAPPER_WIDTH, WRAPPER_HEIGHT } from "./constants-and-variables.js";
import * as VAR from "./constants-and-variables.js";

createBoard(WRAPPER_WIDTH, WRAPPER_HEIGHT);
createMenu();
