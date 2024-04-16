export default function getSkyImageSrc(description, isDay) {
    let imgSrc 
    switch(description) {
        case 'clear sky': {
            if (isDay) imgSrc='./icons/Sunny.png'
            else imgSrc='./icons/Moon.png'
            break
        }
        case 'few clouds': {
            if (isDay) imgSrc='./icons/Cloudy_Sunny.png'
            else imgSrc='./icons/Cloudy_Moon.png'
            break
        }
        case 'scattered clouds': {
            imgSrc='./icons/Cloudy.png'
            break
        }
        case 'broken clouds': {
            imgSrc='./icons/Cloudy.png'
            break
        }
        case 'shower rain': {
            imgSrc='./icons/Shower.png'
            break
        }
        case 'rain': {
            imgSrc='./icons/Rain.png'
            break
        }
        case 'thunderstorm': {
            if (isDay) imgSrc='./icons/Lightning.png'
            else imgSrc='./icons/Lightning_Moon.png'
            break
        }
        case 'snow': {
            imgSrc='./icons/Snow.png'
            break
        }
        case 'mist': {
            imgSrc='./icons/Foggy.png'
            break
        }
    }
    return imgSrc
}