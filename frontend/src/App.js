import './App.css'
import { useState, useEffect } from 'react'
import AppContent from './components/AppContent.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'
import NotFound from './components/NotFound.jsx'

const api_token = "785b5bfae56f4f1aa44195014241604"

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
        const responseForecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_token}&q=${city}}&days=4&aqi=no&alerts=no`)
        if (!responseForecast.ok) setNotFound(true)
        const data = await responseForecast.json()
        const responseHistory1 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date().getDate() - 1))).toISOString().split('T')[0]}`)
        if (!responseHistory1.ok) setNotFound(true)
        const yesterday = await responseHistory1.json()
        const responseHistory2 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date().getDate() - 2))).toISOString().split('T')[0]}`)
        if (!responseHistory2.ok) setNotFound(true)
        const beforeYesterday = await responseHistory2.json()
        setWeatherData(data)
        setHistoryWeather([yesterday, beforeYesterday])
        setLoaded(true)
        localStorage.setItem('weather_city', city)
        console.log(data)
      } catch (err) {
        setError(true)
        setLoaded(true)
        console.error(err)
      }
    }
    fetchWeatherData()
    const intervalId = setInterval(fetchWeatherData, 60000)
    return () => clearInterval(intervalId)
  } , [city])

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
