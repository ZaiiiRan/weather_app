import { useEffect, useState } from 'react'
import './App-content.css'
import Current from './Current'
import CurrentDetails from './CurrentDetails'
import checkTime from './checkTime.js'
import DailyWeather from './DailyWeayjer.jsx'

export default function AppContent({loaded, error, weatherData, city}) {
    const [isDay, setIsDay] = useState(true)
    useEffect(() => {
        if (loaded && !error) {
            const updateIsDay = () => {
                setIsDay(checkTime(weatherData.sys.sunrise, weatherData.sys.sunset, new Date().getTime()))
            }
            updateIsDay()
            const intervalId = setInterval(updateIsDay, 60000)
            return () => clearInterval(intervalId)
        }
    }, [loaded, error, weatherData])

    return (
        <>
            {loaded && !error ? 
                <div className='App-content' style={{
                    backgroundImage: `url(/img/${isDay ? 'day.jpg' : 'night.jpg'})`
                }}>
                    <div className='Content'>
                        <Current city={city} weatherData={weatherData} isDay={isDay}></Current>
                        <CurrentDetails weatherData={weatherData} isDay={isDay}></CurrentDetails>
                        <DailyWeather isDay={isDay}></DailyWeather>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}