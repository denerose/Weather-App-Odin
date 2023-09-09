import { Weather } from "./weather"

export module Display {

    const app = document.getElementById('app') as HTMLDivElement

    export function updateImage() {
        app.style.backgroundImage = "url('images/pexels-chris-f-1465088.jpg')"
        Weather.fetchWeather('Ballarat');
    }
}