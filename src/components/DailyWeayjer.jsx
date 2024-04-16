import './DailyWeather.css'

export default function DailyWeather({isDay}) {
    return (
        <section className='DailyWeather-block'>
            <div className='DailyWeather'>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>Вчера</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>xx°C / xx°C</div>
                            <div className='DailyWeather_wind'>x-x &nbsp; xx м/с</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(255, 255, 255, 0.178)' : 'rgba(0, 0, 0, 0.425)'}}>
                    <div className='DailyWeatherItem-title'>Сегодня</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>xx°C / xx°C</div>
                            <div className='DailyWeather_wind'>x-x &nbsp; xx м/с</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>Завтра</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'>
                            <div>xx°C / xx°C</div>
                            <div className='DailyWeather_wind'>x-x &nbsp; xx м/с</div>
                        </div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>xx.xx</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content pressure-text'></div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>xx.xx</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'></div>
                    </div>
                </div>
                <div className='DailyWeatherItem' style={{backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'}}>
                    <div className='DailyWeatherItem-title'>xx.xx</div>
                    <div className='DailyWeatherItem-inner'>
                        <div className='DailyWeatherItem-Icon'>
                            <img className='DailyWeather_icon' src="./icons/Sunny.png" alt="" draggable={false} />
                        </div>
                        <div className='DailyWeatherItem-content'></div>
                    </div>
                </div>
            </div>
        </section>
    )
}