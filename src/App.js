import './App.css'
import { useState, useEffect, useRef } from 'react'
import Current from './components/Current.jsx'
import Loader from './components/Loader.jsx'

const api_token = "7d033a22cb9478229ceea33b92d1f9fd"

function App() {
  const [loaded, setLoaded] = useState(false)
  const [city, setCity] = useState('Краснодар')
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_token}`)
        const data = await response.json()
        setWeatherData(data)
        setLoaded(true)
        console.log(data)
      } catch (error) {
        console.error("Ошибка при получении данных:", error)
      }
    };
    fetchWeatherData()
  }, [city])

  return (
    <div className="App">
      <Loader loaded={loaded}></Loader>
      {weatherData !== null ? <Current city={city} weatherData={weatherData}></Current> : <></>}
    </div>
  );
}

export default App;
