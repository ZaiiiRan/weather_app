import './App-content.css'
import Current from './Current'
import CurrentDetails from './CurrentDetails'
import DailyWeather from './DailyWeayjer.jsx'

export default function AppContent({loaded, error, weatherData, historyWeather, city}) {
    return (
        <>
            {loaded && !error ? 
                <div className='App-content' style={{
                    backgroundImage: `url(/img/${weatherData.current.is_day === 1 ? 'day.jpg' : 'night.jpg'})`
                }}>
                    <div className='Content'>
                        <Current city={city} weatherData={weatherData}></Current>
                        <CurrentDetails weatherData={weatherData}></CurrentDetails>
                        <DailyWeather weatherData={weatherData} historyWeather={historyWeather}></DailyWeather>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}