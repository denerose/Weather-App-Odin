import { Weather } from "./weather"

export module Display {

    const app = document.getElementById('app') as HTMLDivElement
    let toggleCelsius = true

    export async function updateWeather(searchLocation) {
        await Weather.fetchWeather(searchLocation)
        await setTemp()
        const returnedLocation = await Weather.getReturnedLocation()
        updateLocation(returnedLocation);
        updateImage(await Weather.findIconRef())
    }

    function setTemp() {
    const tempSpan = document.getElementById("tempSpan") as HTMLSpanElement
        const feelSpan = document.getElementById("feelSpan") as HTMLSpanElement
        if (toggleCelsius) {
            tempSpan.innerText = String(Weather.getTempC()) + " ℃"
            feelSpan.innerText = String(Weather.getFeelsLikeC()) + " ℃"
        } else {
            tempSpan.innerText = String(Weather.getTempF()) + " ℉"
            feelSpan.innerText = String(Weather.getFeelsLikeF()) + " ℉"
        }
    }

    function updateImage(iconCode) {
        const icon = document.getElementById("weatherIcon") as HTMLImageElement
        if (Weather.isDay() === 'night') {
            icon.src = String('images/icons/night/'+iconCode+'.png')
        } else {
            icon.src = String('images/icons/day/'+iconCode+'.png')
        }
    }

    function updateLocation(location) {
        const locationSpan = document.getElementById("locationSpan") as HTMLHeadingElement
        locationSpan.innerText = String(location)
    }

    function search(searchInput) {
        updateWeather(searchInput);
    }

    export function addEvents(){
        const form = document.getElementById("searchForm") as HTMLFormElement
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            search(form.searchInput.value)
        })
        const toggle = document.getElementById("cf") as HTMLInputElement
        toggle.addEventListener("click", () => {
            toggleCelsius = !toggleCelsius
            setTemp()
        })
    }
}