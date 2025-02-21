const api_token = `${process.env.WEATHER_API_TOKEN}`

class WeatherService {
    async getWeather(city) {
        const forecastResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_token}&q=${city}&days=4&aqi=no&alerts=no`)
        const forecastData = await forecastResponse.json()
        if (forecastResponse.status === 400) {
            res.status(400).send()
            return
        }
    
        const historyResponse1 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date(forecastData.location.localtime).getDate() - 1))).toISOString().split('T')[0]}`)
        const historyData1 = await historyResponse1.json()
    
        const historyResponse2 = await fetch(`http://api.weatherapi.com/v1/history.json?key=${api_token}&q=${city}&dt=${(new Date(new Date().setDate(new Date(forecastData.location.localtime).getDate() - 2))).toISOString().split('T')[0]}`)
        const historyData2 = await historyResponse2.json()

        const weather = {
            forecast: forecastData, 
            history: [historyData1, historyData2]
        }

        return weather
    }
}

module.exports = new WeatherService()