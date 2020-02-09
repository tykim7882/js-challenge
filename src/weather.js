const API_KEY = "5e0daeaf98ca088fcdb5e192f8473b52"; // https://openweathermap.org/api
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      //console.log(response.json());
      return response.json();
    })
    .then(function(json) {
      //console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}℃ @${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGoeSuccess(position) {
  //console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGoeError() {
  console.log("Can't access geo location ");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGoeSuccess, handleGoeError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    //console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
