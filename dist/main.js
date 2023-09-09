// src/weather.ts
var Weather;
((Weather2) => {
  async function fetchWeather(location) {
    const apiURL = "https://api.weatherapi.com/v1/";
    const urlToCall = new URL("current.json?key=080bba987e614b42b5f04304230909&q=" + location + "&aqi=no", apiURL);
    const response = await fetch(urlToCall);
    const weather = await response.json();
    console.log(weather.current.temp_c);
  }
  Weather2.fetchWeather = fetchWeather;
})(Weather || (Weather = {}));

// src/display.ts
var Display;
((Display2) => {
  const app = document.getElementById("app");
  function updateImage() {
    app.style.backgroundImage = "url('images/pexels-chris-f-1465088.jpg')";
    Weather.fetchWeather("Ballarat");
  }
  Display2.updateImage = updateImage;
})(Display || (Display = {}));

// src/main.ts
function main() {
  Display.updateImage();
}
main();
