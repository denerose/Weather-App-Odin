export module Weather {
    
    export async function fetchWeather (location: string) {
        const apiURL = 'https://api.weatherapi.com/v1/'
        const urlToCall = new URL('current.json?key=080bba987e614b42b5f04304230909&q='+location+'&aqi=no', apiURL)
        const response = await fetch(urlToCall)
        const weather = await response.json()
        console.log(weather.current.temp_c)
    }
}