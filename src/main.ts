import { Display } from "./display"
import { Weather } from "./weather";

async function main() {
    await Weather.getCodes();
    await Display.updateWeather("Ballarat");
    Display.addEvents();
    
}

main()
