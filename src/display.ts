import { Weather } from "./weather"

export module Display {

    const app = document.getElementById('app') as HTMLDivElement

    export async function updateWeather() {
        const tempSpan = document.getElementById("tempSpan") as HTMLSpanElement
        await Weather.fetchWeather('Ballarat')
        tempSpan.innerText = String(Weather.getTempC())
        updateImage(await Weather.findIconRef())
    }

    function updateImage(iconCode) {
        const icon = document.getElementById("weatherIcon") as HTMLImageElement
        icon.src = String('images/icons/day/'+iconCode+'.png')
    }
}