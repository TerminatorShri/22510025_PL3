function validatePassword(password) {
  let hasUppercase = false;
  let hasLowercase = false;
  let hasDigit = false;
  let hasSpecialChar = false;
  const specialChars = '!@#$%^&*(),.?":{}|<>';

  if (password.length < 8) {
    return false;
  }

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char >= "A" && char <= "Z") {
      hasUppercase = true;
    } else if (char >= "a" && char <= "z") {
      hasLowercase = true;
    } else if (char >= "0" && char <= "9") {
      hasDigit = true;
    } else if (specialChars.includes(char)) {
      hasSpecialChar = true;
    }

    if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
      return true;
    }
  }

  return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
}

function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const isValid = validatePassword(password);
  const resultEle = document.getElementById("result");
  if (isValid) {
    resultEle.textContent = "Password is valid!";
    resultEle.style.color = "green";
  } else {
    resultEle.textContent =
      "Password is invalid! It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    resultEle.style.color = "red";
  }
}
