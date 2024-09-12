const button = document.getElementById("button");
const input = document.getElementById("input");
const handleClick = () => {
  input.value = "Hello World";
};
button.addEventListener("click", handleClick);

const element = document.getElementById("element");
const changeText = () => {
  element.innerText = "Thanks !";
};
element.addEventListener("mouseover", changeText);

const toggleColor = (isEntering) => {
  element.style.background = isEntering ? "orange" : "black";
};
element.addEventListener("mouseenter", () => toggleColor(true));
element.addEventListener("mouseleave", () => toggleColor(false));
