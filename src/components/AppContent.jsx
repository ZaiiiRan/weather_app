import { useEffect, useState } from 'react'
import './App-content.css'
import Current from './Current'

export default function AppContent({loaded, error, weatherData, city}) {
    const [isDay, setIsDay] = useState(true)
    useEffect(() => {
        if (loaded && !error) {
            const checkTime = () => {
                const now = new Date().getTime()
                const sunrise = new Date(weatherData.sys.sunrise * 1000).getTime()
                const sunset = new Date (weatherData.sys.sunset * 1000).getTime()
                setIsDay(now >= sunrise && now <= sunset)
            }
            checkTime()
            const intervalId = setInterval(checkTime, 60000)
            return () => clearInterval(intervalId)
        }
    }, [loaded, error, weatherData])
    return (
        <>
            {loaded && !error ? 
                <div className='App-content' style={{
                    backgroundImage: `url(/img/${isDay ? 'day.jpg' : 'night.jpg'})`
                }}>
                    <Current city={city} weatherData={weatherData} isDay={isDay}></Current>
                </div>
                :
                <></>
            }
        </>
    )
}