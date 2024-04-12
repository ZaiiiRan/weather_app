import './App.css'
import { useState, useEffect, useRef } from 'react'
import Current from './components/Current.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'

const api_token = "7d033a22cb9478229ceea33b92d1f9fd"

function App() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
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
      } catch (err) {
        setError(true)
        setLoaded(true)
        console.error(err)
      }
    };
    fetchWeatherData()
  }, [city])

  return (
    <div className="App">
      <Loader loaded={loaded}></Loader>
      <Error error={error}></Error>
      {loaded && !error ? 
        <div className='App-content'>
          <Current city={city} weatherData={weatherData}></Current>
        </div>
        :
        <></>}
    </div>
  );
}

export default App;
