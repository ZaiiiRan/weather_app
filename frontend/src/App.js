import './App.css'
import { useState, useEffect } from 'react'
import AppContent from './components/AppContent.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'
import ChangeLocation from './components/ChangeLocation.jsx'

const api_token = "7d033a22cb9478229ceea33b92d1f9fd"

function App() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [city, setCity] = useState('Краснодар')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_token}`);
        const data = await response.json()
        setWeatherData(data)
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
      <AppContent error={error} loaded={loaded} weatherData={weatherData} city={city}></AppContent>
    </div>
  );
}

export default App;
