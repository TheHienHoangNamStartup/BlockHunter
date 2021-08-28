function randomColor() {
  return Object.values(COLOR)[Math.floor(Math.random() * Object.keys(COLOR).length)];
}
