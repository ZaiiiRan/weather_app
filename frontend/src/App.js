import './App.css'
import { useState, useEffect } from 'react'
import AppContent from './components/AppContent.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'

const api_token = "785b5bfae56f4f1aa44195014241604"

function App() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [city, setCity] = useState('Краснодар')
  const [weatherData, setWeatherData] = useState(null)
  const [historyWeather, setHistoryWeather] = useState([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responseForecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_token}&q=${city}}&days=4&aqi=no&alerts=no`);
        const data = await responseForecast.json()
        const responseHistory1 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date().getDate() - 1))).toISOString().split('T')[0]}`)
        const yesterday = await responseHistory1.json()
        const responseHistory2 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date().getDate() - 2))).toISOString().split('T')[0]}`)
        const beforeYesterday = await responseHistory2.json()
        setWeatherData(data)
        setHistoryWeather([yesterday, beforeYesterday])
        setLoaded(true)
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
  } , [city, api_token])

  return (
    <div className="App">
      <Loader loaded={loaded}></Loader>
      <Error error={error}></Error>
      <AppContent error={error} loaded={loaded} weatherData={weatherData} historyWeather={historyWeather} city={city}></AppContent>
    </div>
  );
}

export default App;
