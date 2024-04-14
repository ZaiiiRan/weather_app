import './Current.css'

function convertDegsToCompass(degs) {
    if (degs >= 0 && degs < 22) return 'С'
    else if (degs >= 22 && degs <= 67) return 'С-В'
    else if (degs > 67 && degs < 112) return 'В'
    else if (degs >= 112 && degs <= 157) return 'Ю-В'
    else if (degs > 157 && degs < 202) return 'Ю'
    else if (degs >= 202 && degs <= 247) return 'Ю-З'
    else if (degs > 247 && degs < 292) return 'З'
    else if (degs >= 292 && degs <= 337) return 'С-З'
    else return 'С'  
}

export default function Current({city, weatherData, isDay}) {
    let imgSrc
    switch(weatherData.weather[0].description) {
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

    return (
        <div>
            <div className="Current" style={{
                backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
            }}>
                <div className='Current-left'>
                    <div className='city-text'>{city}</div>
                    <div className='temp' >
                        {Math.round(weatherData.main.temp)}°C
                    </div>
                    <div className='max-min-temp'>
                        {Math.round(weatherData.main.temp_min)}°C / {Math.round(weatherData.main.temp_max)}°C
                    </div>
                    <div className='wind'>
                        {convertDegsToCompass(weatherData.wind.deg)} &nbsp; &nbsp; &nbsp;{weatherData.wind.speed} м/c               
                    </div>
                </div>
                <div className='Current-right'>
                    <img src={imgSrc} alt="" draggable={false}/>
                </div>
            </div>
        </div>
        
    )
}