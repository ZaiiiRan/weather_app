import './CurrentDetails.css'
import convertDegsToCompass from './convertDegsToCompass.js'

function getTime(utcTime) {
    const date = new Date(utcTime * 1000)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return hours + ':' + minutes
}

export default function CurrentDetails({weatherData, isDay}) {
    return (
        <section className='CurrentDetailsBlock'>
            <div className='CurrentDetails'>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Ощущается как</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Temperature.png" alt="" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{parseInt(weatherData.main.feels_like)}°C</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Влажность</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Humidity.png" alt="" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{parseInt(weatherData.main.humidity)}%</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Ветер</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/wind.png" alt="" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>
                            <div>{convertDegsToCompass(weatherData.wind.deg)}</div>
                            <div>{weatherData.wind.speed} м/c</div>
                        </div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Атмосферное давление</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/pressure.png" alt="" draggable={false} style={{width:'60%'}}/>
                        </div>
                        <div className='DetailsItem-content pressure-text'>{weatherData.main.pressure} гПа</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Восход</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Sunrise.png" alt="" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{getTime(weatherData.sys.sunrise)}</div>
                    </div>
                </div>
                <div className='DetailsItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DetailsItem-title'>Закат</div>
                    <div className='DetailsItem-inner'>
                        <div className='DetailsItem-Icon'>
                            <img className='details_icon' src="./icons/Sunset.png" alt="" draggable={false} />
                        </div>
                        <div className='DetailsItem-content'>{getTime(weatherData.sys.sunset)}</div>
                    </div>
                </div>
                
            </div>
        </section>
        
    )
}