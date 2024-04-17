import './CurrentDetails.css'
import convertWindDir from './convertWindDir'
import covertTo24Hours from './convertTo24Hours'

export default function CurrentDetails({weatherData}) {
    return (
        <section className='CurrentDetailsBlock'>
            <div className='CurrentDetails'>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Ощущается как</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Temperature.png" alt="temperature-icon" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{Math.round(weatherData.current.feelslike_c)}°C</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Влажность</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Humidity.png" alt="humidity-icon" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{Math.round(weatherData.current.humidity)}%</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Ветер</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/wind.png" alt="wind-icon" draggable={false} />
                        </div>
                        <div className='DetailsItem-content DetailsItem-content-wind'>
                            <div>{convertWindDir(weatherData.current.wind_dir)}</div>
                            <div>{weatherData.current.wind_kph} км/ч</div>
                        </div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Атмосферное давление</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/pressure.png" alt="pressure-icon" draggable={false} style={{width:'60%'}}/>
                        </div>
                        <div className='DetailsItem-content pressure-text'>{weatherData.current.pressure_mb} гПа</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Восход</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Sunrise.png" alt="sunrise-icon" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{covertTo24Hours(weatherData.forecast.forecastday[0].astro.sunrise)}</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: (weatherData.current.is_day === 1) ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Закат</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Sunset.png" alt="sunset-icon" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{covertTo24Hours(weatherData.forecast.forecastday[0].astro.sunset)}</div>
                    </div>
                </div>
                
            </div>
        </section>
        
    )
}