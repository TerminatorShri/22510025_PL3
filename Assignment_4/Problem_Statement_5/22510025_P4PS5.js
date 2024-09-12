let moving = false;
let direction = 1;
let moveTimeout;

function move() {
  const button = document.getElementById("movingButton");
  const currentLeft = parseInt(button.style.left, 10) || 0;

  button.style.left = currentLeft + direction + "px";

  if (
    currentLeft + direction >= window.innerWidth - button.offsetWidth ||
    currentLeft + direction <= 0
  ) {
    direction *= -1;
  }

  moveTimeout = setTimeout(move, 10);
}

function toggleMove() {
  if (moving) {
    clearTimeout(moveTimeout);
    moving = false;
  } else {
    moving = true;
    move();
  }
}
