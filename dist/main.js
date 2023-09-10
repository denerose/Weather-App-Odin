// src/weather.ts
var Weather;
((Weather2) => {
  let weather;
  async function fetchWeather(location) {
    const apiURL = "https://api.weatherapi.com/v1/";
    const urlToCall = new URL("current.json?key=080bba987e614b42b5f04304230909&q=" + location + "&aqi=no", apiURL);
    const response = await fetch(urlToCall);
    const newWeather = await response.json();
    console.log(newWeather.location.name, newWeather.location.tz_id);
    weather = newWeather;
    return newWeather;
  }
  Weather2.fetchWeather = fetchWeather;
  function getTempC() {
    return weather.current.temp_c;
  }
  Weather2.getTempC = getTempC;
})(Weather || (Weather = {}));

// src/display.ts
var Display;
((Display2) => {
  const app = document.getElementById("app");
  async function updateWeather() {
    const tempSpan = document.getElementById("tempSpan");
    await Weather.fetchWeather("Ballarat");
    tempSpan.innerText = String(Weather.getTempC());
  }
  Display2.updateWeather = updateWeather;
  function updateImage() {
    app.style.backgroundImage = "url('images/pexels-chris-f-1465088.jpg')";
  }
})(Display || (Display = {}));

// src/main.ts
function main() {
  Display.updateWeather();
}
main();
