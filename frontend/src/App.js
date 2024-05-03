import './App.css'
import { useState, useEffect } from 'react'
import AppContent from './components/AppContent.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'
import NotFound from './components/NotFound.jsx'
import LoadImgs from './LoadImgs.js'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [city, setCity] = useState(localStorage.getItem('weather_city') === null ? 'Москва' : localStorage.getItem('weather_city'))
  const [weatherData, setWeatherData] = useState(null)
  const [historyWeather, setHistoryWeather] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/weather/${city}`)
        await LoadImgs()
        if (response.status === 400) {
          setNotFound(true)
          setLoaded(true)
        } else if (response.status === 500) {
          setError(true)
          setLoaded(true)
        } else {
          const data = await response.json()
          setWeatherData(data.forecast)
          setHistoryWeather(data.history)
          setLoaded(true)
          localStorage.setItem('weather_city', city)
        }
      } catch (err) {
        setError(true)
        setLoaded(true)
        console.error(err)
      }
    }
    fetchWeatherData()
    const intervalId = setInterval(fetchWeatherData, 60000)
    return () => clearInterval(intervalId)
  }, [city])

  useEffect(() => {
    setLoaded(false)
    setError(false)
    setNotFound(false)
  }, [city])

  return (
    <div className="App">
      <Loader loaded={loaded}></Loader>
      <NotFound notFound={notFound} setCity={setCity}></NotFound>
      <Error error={error}></Error>
      <AppContent notFound={notFound} error={error} loaded={loaded} weatherData={weatherData} historyWeather={historyWeather} city={city} setCity={setCity}></AppContent>
    </div>
  );
}

export default App;
