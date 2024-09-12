const button = document.getElementById("button");
const redCircle = document.getElementById("red");

const removeRedCircle = () => {
  if (redCircle) {
    redCircle.remove();
  }
};

button.addEventListener("click", removeRedCircle);
