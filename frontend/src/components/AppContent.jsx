import './App-content.css'
import Current from './Current'
import CurrentDetails from './CurrentDetails'
import DailyWeather from './DailyWeather.jsx'
import ChangeLocation from './ChangeLocation.jsx'

export default function AppContent({loaded, notFound, error, weatherData, historyWeather, setCity}) {
    return (
        <>
            {loaded && !error && !notFound ? 
                <div className='App-content' style={{
                    backgroundImage: `url(/img/${weatherData.current.is_day === 1 ? 'day.jpg' : 'night.jpg'})`
                }}>
                    <ChangeLocation isDay={weatherData.current.is_day === 1} setCity={setCity}></ChangeLocation>
                    <div className='Content'>
                        <Current weatherData={weatherData}></Current>
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