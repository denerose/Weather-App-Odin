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
  async function findIconRef() {
    const code = weather.current.condition.code;
    const weatherTableResponse = await fetch("/weather_conditions.json");
    const weatherTableJson = await weatherTableResponse.json();
    const findCode = await weatherTableJson.find((item) => {
      if (item.code === code)
        return true;
    });
    console.log(code, findCode.icon);
    const iconRef = findCode.icon;
    return String(iconRef);
  }
  Weather2.findIconRef = findIconRef;
})(Weather || (Weather = {}));

// src/display.ts
var Display;
((Display2) => {
  const app = document.getElementById("app");
  async function updateWeather() {
    const tempSpan = document.getElementById("tempSpan");
    await Weather.fetchWeather("Ballarat");
    tempSpan.innerText = String(Weather.getTempC());
    updateImage(await Weather.findIconRef());
  }
  Display2.updateWeather = updateWeather;
  function updateImage(iconCode) {
    const icon = document.getElementById("weatherIcon");
    icon.src = String("images/icons/day/" + iconCode + ".png");
  }
})(Display || (Display = {}));

// src/main.ts
function main() {
  Display.updateWeather();
}
main();
