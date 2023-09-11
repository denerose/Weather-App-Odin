import { Weather } from "./weather"

export module Display {

    const app = document.getElementById('app') as HTMLDivElement
    let searchLocation = "Ballarat"

    export async function updateWeather() {
        const tempSpan = document.getElementById("tempSpan") as HTMLSpanElement
        await Weather.fetchWeather(searchLocation)
        tempSpan.innerText = String(await Weather.getTempC())
        const returnedLocation = await Weather.getReturnedLocation()
        updateLocation(returnedLocation);
        updateImage(await Weather.findIconRef())
    }

    function updateImage(iconCode) {
        const icon = document.getElementById("weatherIcon") as HTMLImageElement
        icon.src = String('images/icons/day/'+iconCode+'.png')
    }

    function updateLocation(location) {
        const locationSpan = document.getElementById("locationSpan") as HTMLHeadingElement
        locationSpan.innerText = String(location)
    }
}