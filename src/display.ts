import { Weather } from "./weather"

export module Display {

    const app = document.getElementById('app') as HTMLDivElement

    export async function updateWeather() {
        const tempSpan = document.getElementById("tempSpan") as HTMLSpanElement
        await Weather.fetchWeather('Ballarat')
        tempSpan.innerText = String(Weather.getTempC())
    }

    function updateImage() {
        app.style.backgroundImage = "url('images/pexels-chris-f-1465088.jpg')"
    }
}