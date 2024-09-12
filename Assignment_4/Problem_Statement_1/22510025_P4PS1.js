const buttonElem = document.querySelector("button");
const inputElem = document.querySelector("input");

buttonElem.addEventListener("click", () => {
  const oldText = inputElem.value;
  inputElem.value = oldText === "ON" ? "OFF" : "ON";
});

const listIems = document.querySelectorAll(".list li");

const handleHover = (event) => {
  event.target.innerText = "ON";
};

if (listIems.length > 1) {
  listIems.forEach((item) => item.addEventListener("mouseover", handleHover));
}
