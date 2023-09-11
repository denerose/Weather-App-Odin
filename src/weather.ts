export module Weather {

    type WeatherType = {
        "location": {
            "name": string
            "region": string
            "country": string
            "lat": number
            "lon": number
            "tz_id": string
            "localtime_epoch": 1694335535,
            "localtime": "2023-09-10 18:45"
        },
        "current": {
            "last_updated_epoch": number,
            "last_updated": Date
            "temp_c": number
            "temp_f": number
            "is_day": number
            "condition": {
                "text": string
                "icon": string
                "code": number
            },
            "wind_mph": number
            "wind_kph": number
            "wind_degree": number
            "wind_dir": string
            "pressure_mb": number
            "pressure_in": number
            "precip_mm": number
            "precip_in": number
            "humidity": number
            "cloud": number
            "feelslike_c": number
            "feelslike_f": number
            "vis_km": number
            "vis_miles": number
            "uv": number
            "gust_mph": number
            "gust_kph": number
        }
    }

    type Code = {
        code: number
        day: string
        night: string
        icon: number
    }

    let weather: WeatherType

    let codes: Code[]

    export async function getCodes() {
    const weatherTableResponse =  await fetch('/weather_conditions.json')
    const weatherTableJson = await weatherTableResponse.json() as Code[]
    codes = weatherTableJson
}


    export async function fetchWeather(location: string): Promise<WeatherType> {
        const apiURL = 'https://api.weatherapi.com/v1/'
        const urlToCall = new URL('current.json?key=080bba987e614b42b5f04304230909&q=' + location + '&aqi=no', apiURL)
        const response = await fetch(urlToCall)
        const newWeather = await response.json()
        console.log(newWeather.location.name, newWeather.location.tz_id)
        weather = newWeather
        return (newWeather)
    }

    export function getTempC() {
        return (weather.current.temp_c)
    }

    export function getFeelsLikeC() {
        return (weather.current.feelslike_c)
    }

    export function getTempF() {
        return (weather.current.temp_f)
    }

    export function getFeelsLikeF() {
        return (weather.current.feelslike_f)
    }

    export function getReturnedLocation() {
        return (`${weather.location.name}, ${weather.location.country}`)
    }

    export async function findIconRef() {
        const code = weather.current.condition.code
        
        const findCode = await codes.find((item => { if (item.code === code) return true }))
        if (findCode !== undefined) {
            console.log(code, findCode.icon)
            const iconRef = findCode.icon
            return (String(iconRef))
        }
        else throw Error('weather code undefined')
    }
}