export default function getSkyImageSrc(description, isDay = 1) {
    description = description.trim()
    let imgSrc 
    switch(description) {
        case 'Clear': {
            imgSrc='./icons/Moon.png'
            break
        }
        case 'Sunny': {
            imgSrc='./icons/Sunny.png'
            break
        }
        case 'Partly cloudy': {
            if (isDay === 1) imgSrc='./icons/Cloudy_Sunny.png'
            else imgSrc='./icons/Cloudy_Moon.png'
            break
        }
        case 'Partly Cloudy': {
            if (isDay === 1) imgSrc='./icons/Cloudy_Sunny.png'
            else imgSrc='./icons/Cloudy_Moon.png'
            break
        }
        case 'Cloudy': {
            imgSrc='./icons/Cloudy.png'
            break
        }
        case 'Overcast': {
            imgSrc='./icons/Cloudy.png'
            break
        }
        case 'Rain': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Patchy light drizzle': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light drizzle': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Freezing drizzle': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Patchy light rain': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light rain': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Moderate rain': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Moderate rain at times': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light rain shower': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light freezing rain': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Patchy rain nearby': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light sleet': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Light sleet showers': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'Heavy freezing drizzle': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Moderate or heavy rain shower': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Torrential rain shower': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Moderate or heavy sleet': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Patchy rain possible': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Patchy freezing drizzle possible': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Heavy rain at times': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Heavy rain': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Moderate or heavy freezing rain': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'Thunderstorm': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Patchy light rain with thunder': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Moderate or heavy rain with thunder': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Patchy light snow with thunder': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Moderate or heavy snow with thunder': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Thundery outbreaks possible': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Thundery outbreaks in nearby': {
            if (isDay === 1) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'Patchy snow possible': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Patchy ытщц nearby': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Patchy light snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Moderate or heavy sleet showers': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Light snow showers': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Moderate or heavy snow showers': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Light showers of ice pellets': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Moderate or heavy showers of ice pellets': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Light snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Patchy moderate snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Moderate snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Patchy heavy snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Heavy snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Ice pellets': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Blowing snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Blizzard': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'Mist': {
            imgSrc='./icons/Foggy.png'
            break
        }
        case 'Fog': {
            imgSrc='./icons/Foggy.png'
            break
        }
        case 'Freezing fog': {
            imgSrc='./icons/Foggy.png'
            break
        }
        case 'Dust': {
            imgSrc='./icons/Foggy.png'
            break
        }
        case 'Smoke': {
            imgSrc='./icons/Foggy.png'
            break
        }
    }
    return imgSrc
}