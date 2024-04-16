import './Current.css'
import './getSkyImageSrc.js'
import convertDegsToCompass from './convertDegsToCompass.js'
import getSkyImageSrc from './getSkyImageSrc.js'

export default function Current({city, weatherData, isDay}) {
    return (
        <section  className='Current-block'>
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
                    <img src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" draggable={false}/>
                </div>
            </div>
            <div className='Current-hours' style={{
                backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
            }}>
                <div className='Current-hours-container'>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>22:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>23:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>00:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>01:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>02:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>03:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>04:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                    <div className='Current-hours-item'style={{
                        backgroundColor: isDay ? 'rgba(0, 0, 0, 0.178)' : 'rgba(255, 255, 255, 0.178)'
                    }}>
                        <div className='Current-hours-item__title'>05:00</div>
                        <img className='Current-hours-item__img' src={getSkyImageSrc(weatherData.weather[0].description, isDay)} alt="" />
                        <div className='Current-hours-item__temp'>{Math.round(weatherData.main.temp)}°C</div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}