import './DailyWeather.css'
import convertWindDir from './convertWindDir'
import getSkyImageSrc from './getSkyImageSrc'

function getDate(date) {
    return date.slice(date.length - 2, date.length) + '.' + date.slice(date.length - 5, date.length - 3)
}

export default function DailyWeather({weatherData, historyWeather}) {
    return (
        <section className='DailyWeather-block'>
            <div className='DailyWeather'>
                <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>Позавчера</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src={getSkyImageSrc(historyWeather[1].forecast.forecastday[0].day.condition.text)} alt="weather-icon" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>{Math.round(historyWeather[1].forecast.forecastday[0].day.maxtemp_c)}°C / {Math.round(historyWeather[1].forecast.forecastday[0].day.mintemp_c)}°C</div>
                            <div className='DailyWeather_wind'>{convertWindDir(historyWeather[1].forecast.forecastday[0].hour[12].wind_dir)} &nbsp; {historyWeather[1].forecast.forecastday[0].hour[12].wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>Вчера</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src={getSkyImageSrc(historyWeather[0].forecast.forecastday[0].day.condition.text)} alt="weather-icon" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>{Math.round(historyWeather[0].forecast.forecastday[0].day.maxtemp_c)}°C / {Math.round(historyWeather[0].forecast.forecastday[0].day.mintemp_c)}°C</div>
                            <div className='DailyWeather_wind'>{convertWindDir(historyWeather[0].forecast.forecastday[0].hour[12].wind_dir)} &nbsp; {historyWeather[0].forecast.forecastday[0].hour[12].wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(255, 255, 255, 0.178)' : 'rgba(0, 0, 0, 0.425)'}}>
                    <div className='DailyWeatherItem-title'>Сегодня</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src={getSkyImageSrc(weatherData.forecast.forecastday[0].day.condition.text)} alt="weather-icon" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>{Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}°C / {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}°C</div>
                            <div className='DailyWeather_wind'>{convertWindDir(weatherData.forecast.forecastday[0].hour[12].wind_dir)} &nbsp; {weatherData.forecast.forecastday[0].hour[12].wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>Завтра</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src={getSkyImageSrc(weatherData.forecast.forecastday[1].day.condition.text)} alt="weather-icon" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>{Math.round(weatherData.forecast.forecastday[1].day.maxtemp_c)}°C / {Math.round(weatherData.forecast.forecastday[1].day.mintemp_c)}°C</div>
                            <div className='DailyWeather_wind'>{convertWindDir(weatherData.forecast.forecastday[1].hour[12].wind_dir)} &nbsp; {weatherData.forecast.forecastday[1].hour[12].wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>{getDate(weatherData.forecast.forecastday[2].date)}</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src={getSkyImageSrc(weatherData.forecast.forecastday[2].day.condition.text)} alt="weather-icon" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>{Math.round(weatherData.forecast.forecastday[2].day.maxtemp_c)}°C / {Math.round(weatherData.forecast.forecastday[2].day.mintemp_c)}°C</div>
                            <div className='DailyWeather_wind'>{convertWindDir(weatherData.forecast.forecastday[2].hour[12].wind_dir)} &nbsp; {weatherData.forecast.forecastday[2].hour[12].wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                {
                    weatherData.forecast.forecastday[3] 
                    ? 
                    <div className='DailyWeatherItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                        <div className='DailyWeatherItem-title'>{getDate(weatherData.forecast.forecastday[3].date)}</div>
                        <div className='DailyWeatherItem-inner'>
                            <div className='DailyWeatherItem-Icon'>
                                <img className='DailyWeather_icon' src={getSkyImageSrc(weatherData.forecast.forecastday[3].day.condition.text)} alt="weather-icon" draggable={false} />
                            </div>
                            <div className='DailyWeatherItem-content'>
                                <div>{Math.round(weatherData.forecast.forecastday[3].day.maxtemp_c)}°C / {Math.round(weatherData.forecast.forecastday[3].day.mintemp_c)}°C</div>
                                <div className='DailyWeather_wind'>{convertWindDir(weatherData.forecast.forecastday[3].hour[12].wind_dir)} &nbsp; {weatherData.forecast.forecastday[3].hour[12].wind_kph} км/ч</div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </section>
    )
}