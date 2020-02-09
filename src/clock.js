const clockArea = document.querySelector(".js-clock");

function setTime() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  clockArea.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}

function init() {
  setTime();
  setInterval(setTime, 1000);
}

init();
