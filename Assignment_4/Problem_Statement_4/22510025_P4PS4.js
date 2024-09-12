// Part 1
const button1 = document.getElementById("button1");
const checkbox1 = document.getElementById("checkbox1");

button1.addEventListener("click", () => {
  checkbox1.checked = true;
});

// Part 2
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const fullNameInput = document.getElementById("fullName");
const combineBtn = document.getElementById("combine-btn");

combineBtn.addEventListener("click", () => {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  fullNameInput.value = `${firstName} ${lastName}`;
});

// Part 3
const valueBtn = document.getElementById("value-btn");
const incrementBtn = document.getElementById("increment-btn");
const resetBtn = document.getElementById("reset-btn");

incrementBtn.addEventListener("click", () => {
  let currentValue = parseInt(valueBtn.textContent);
  currentValue += 1;
  valueBtn.textContent = currentValue;
});

resetBtn.addEventListener("click", () => {
  valueBtn.textContent = 0;
});

// Part 4
const filterInput = document.getElementById("filterInput");
const itemList = document.getElementById("itemList");
const items = itemList.getElementsByTagName("li");

filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.toLowerCase();

  Array.from(items).forEach((item) => {
    const itemName = item.textContent.toLowerCase();
    if (itemName.includes(filterValue)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
});

// Part 5
const balloons = document.querySelectorAll(".balloon");
const refreshBtn = document.getElementById("refreshBtn");

balloons.forEach((balloon) => {
  balloon.addEventListener("mouseover", () => {
    balloon.classList.add("hidden");
  });
});

refreshBtn.addEventListener("click", () => {
  balloons.forEach((balloon) => {
    balloon.classList.remove("hidden");
  });
});
