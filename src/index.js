const USERNAME_LS = "username";

const displayName = document.querySelector(".js-display-name");
const nameForm = document.querySelector(".js-input-form");
const nameInput = document.querySelector(".js-input-name");
const todoArea = document.querySelector(".js-todos");
const body = document.querySelector("body");
const IMG_NUMBER = 5;

function insertUserName() {
  //event.preventDefault();
  const userName = nameInput.value;
  if (userName !== "") {
    localStorage.setItem(USERNAME_LS, userName);
  }
}

function dispalyUserName(userNm) {
  displayName.innerHTML = `Hello ${userNm} !!`;
}

function displayBackgroundImg() {
  const backImg = Math.floor(Math.random() * IMG_NUMBER);
  const image = new Image();
  image.src = `./images/${backImg + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function init() {
  displayBackgroundImg();
  const userName = localStorage.getItem(USERNAME_LS);
  //localStorage.removeItem(USERNAME_LS);
  if (userName !== null) {
    displayName.setAttribute("style", "display:block;");
    todoArea.setAttribute("style", "display:block;");
    dispalyUserName(userName);
  } else {
    nameForm.setAttribute("style", "display:block;");
    nameForm.addEventListener("submit", insertUserName);
  }
}

init();
