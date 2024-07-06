import './Current.css'
import './getSkyImageSrc.js'
import convertWindDir from './convertWindDir.js'
import getSkyImageSrc from './getSkyImageSrc.js'
import { useEffect, useState } from 'react'

function createPerHourWeather(weatherData) {
    const arr = []
    const now = new Date(weatherData.location.localtime).getHours()
    for (let i = now; i <= 23; i++) {
        const time = i.toString().padStart(2, '0') + ':00'
        const temp = Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c)
        const iconSrc = getSkyImageSrc(weatherData.forecast.forecastday[0].hour[i].condition.text, weatherData.forecast.forecastday[0].hour[i].is_day)
        arr.push([time, temp, iconSrc])
    }
    let i = 0
    while (arr.length !== 24) {
        const time = i.toString().padStart(2, '0') + ':00'
        const temp = Math.round(weatherData.forecast.forecastday[1].hour[i].temp_c)
        const iconSrc = getSkyImageSrc(weatherData.forecast.forecastday[1].hour[i].condition.text, weatherData.forecast.forecastday[1].hour[i].is_day)
        arr.push([time, temp, iconSrc])
        i++
    } 
    return arr
}

export default function Current({weatherData}) {
    const [hourForecast, setHourForecast] = useState(createPerHourWeather(weatherData))

    useEffect(() => {
        const newHourForecast = createPerHourWeather(weatherData)
        setHourForecast(newHourForecast)
    }, [weatherData])

    return (
        <section  className='Current-block'>
            <div className="Current" style={{
                backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
            }}>
                <div className='Current-left'>
                    <div className='city-text'>{weatherData.location.name}</div>
                    <div className='temp' >
                        {Math.round(weatherData.current.temp_c)}°C
                    </div>
                    <div className='max-min-temp'>
                        {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}°C / {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°C
                    </div>
                    <div className='wind'>
                        {convertWindDir(weatherData.current.wind_dir)} &nbsp; &nbsp; &nbsp;{weatherData.current.wind_kph } км/ч               
                    </div>
                </div>
                <div className='Current-right'>
                    <img src={getSkyImageSrc(weatherData.current.condition.text, weatherData.current.is_day)} alt="weather-icon" draggable={false}/>
                </div>
            </div>
            <div className='Current-hours' style={{
                backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
            }}>
                <div className='Current-hours-container' >
                    {
                        hourForecast.map((element) => {
                            return (
                                <div className='Current-hours-item' key={element[0]} style={{
                                    backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                                }}>
                                    <div className='Current-hours-item__title'>{element[0]}</div>
                                    <img className='Current-hours-item__img' src={element[2]} alt="weather-icon" draggable={false} />
                                    <div className='Current-hours-item__temp'>{element[1]}°C</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
        
    )
}