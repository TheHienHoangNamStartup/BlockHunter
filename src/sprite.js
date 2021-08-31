class Sprite {
  constructor(row, color) {
    this.row = row;
    this.color = color;
    this.velocityX;
    this.velocityY;
    this.removed = false;
  }

  setAnimation() {

  }

  setVelocity(x, y) {
    this.velocityX = x;
    this.velocityY = y;
  }

  // Checks if the sprite is touching the target sprite
  isTouching(target) {

  }

  destroy() {

  }
}
