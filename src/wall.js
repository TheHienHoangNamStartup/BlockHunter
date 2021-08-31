class Wall extends Sprite {
  constructor() {
    super();
  }
  draw() {
    let wall = document.createElement("div");
    wall.id = "wall";
    wall.style.width = `${WALL_WIDTH * CELL}rem`;
    wall.style.height = `${(CONTAINER_HEIGHT - 2) * CELL}rem`;
    wall.style.marginTop = `${CELL}rem`;
    wall.style.left = `${CELL}rem`;
    document.getElementById("container").appendChild(wall);
  }
}
