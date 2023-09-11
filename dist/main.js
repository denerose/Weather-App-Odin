// src/weather.ts
var Weather;
((Weather2) => {
  let weather;
  let codes;
  async function getCodes() {
    const weatherTableResponse = await fetch("/weather_conditions.json");
    const weatherTableJson = await weatherTableResponse.json();
    codes = weatherTableJson;
  }
  Weather2.getCodes = getCodes;
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
  function getReturnedLocation() {
    return `${weather.location.name}, ${weather.location.country}`;
  }
  Weather2.getReturnedLocation = getReturnedLocation;
  async function findIconRef() {
    const code = weather.current.condition.code;
    const findCode = await codes.find((item) => {
      if (item.code === code)
        return true;
    });
    if (findCode !== void 0) {
      console.log(code, findCode.icon);
      const iconRef = findCode.icon;
      return String(iconRef);
    } else
      throw Error("weather code undefined");
  }
  Weather2.findIconRef = findIconRef;
})(Weather || (Weather = {}));

// src/display.ts
var Display;
((Display2) => {
  const app = document.getElementById("app");
  async function updateWeather(searchLocation) {
    const tempSpan = document.getElementById("tempSpan");
    await Weather.fetchWeather(searchLocation);
    tempSpan.innerText = String(await Weather.getTempC());
    const returnedLocation = await Weather.getReturnedLocation();
    updateLocation(returnedLocation);
    updateImage(await Weather.findIconRef());
  }
  Display2.updateWeather = updateWeather;
  function updateImage(iconCode) {
    const icon = document.getElementById("weatherIcon");
    icon.src = String("images/icons/day/" + iconCode + ".png");
  }
  function updateLocation(location) {
    const locationSpan = document.getElementById("locationSpan");
    locationSpan.innerText = String(location);
  }
  function search(searchInput) {
    updateWeather(searchInput);
  }
  function addEvents() {
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      search(form.searchInput.value);
    });
  }
  Display2.addEvents = addEvents;
})(Display || (Display = {}));

// src/main.ts
async function main() {
  await Weather.getCodes();
  await Display.updateWeather("Ballarat");
  Display.addEvents();
}
main();
