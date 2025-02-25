  // execute after fully loaded html
document.addEventListener("DOMContentLoaded", function () {
  const password = document.getElementById("psw"); // password input field
  const email = document.getElementById("email"); // email input field
  const signInButton = document.getElementById("sign-in");
  const passwordError = document.querySelector(".error-password"); // error message for password
  const emailError = document.querySelector(".error-email"); // error message for email

  // check if inputed email format is valid
function validateEmail(email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return isValid;
}

  // check if inputed password format is valid
function validatePassword(password) {
  const isValid = password.length >= 4;
  return isValid;
}

  // clear any previous error messages
function clearErrors() {
  emailError.textContent = ""; 
  passwordError.textContent = ""; 
  passwordError.style.color = ""; 
}

email.addEventListener("input", clearErrors); // clear errors when input changes in email field
password.addEventListener("input", clearErrors); // clear errors when input changes in password field

  // event listener for sign in button
signInButton.addEventListener("click", function (event) {
  event.preventDefault();
  signIn();
});

  // event listener for the Enter key press in the email field
email.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    signIn();
  }
});

  // event listener for the Enter key press in the password field
password.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    signIn();
  }
});

  // sign in process
function signIn() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  let isValid = true;

  if (!validateEmail(emailValue)) {
    emailError.textContent = "Please enter a valid email";
    isValid = false;
  }

  if (!validatePassword(passwordValue)) {
    passwordError.textContent = "Must have atleast 4 characters";
    isValid = false;
  }

  if (isValid) {
    document.cookie ="authenticated=true;SameSite=None; Secure;Max-Age=2592000000;path=/";
    window.location.href = "index.html";
  }
}});