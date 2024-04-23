const express = require('express')
const app = express()
const cors = require('cors')
const port = 3030
app.use(cors())
const fs = require('fs')

const citiesData = JSON.parse(fs.readFileSync('./cities/cities.json', 'utf8'))

/*!!!!!!!!-YOUR-API-TOKEN!!!!!!!!!!!!!*/
const api_token = '785b5bfae56f4f1aa44195014241604'
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

app.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`)
})

app.get('/weather/:city', async (req, res) => {
    const {city} = req.params
    try {
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
    
        res.json({ forecast: forecastData, history: [historyData1, historyData2] })
    }
    catch (error) {
        res.status(500).send()
    }
})

app.get('/city/:city_part', async (req, res) => {
    const { city_part } = req.params
    const matchingCities = citiesData.filter(city => city.city.toLowerCase().includes(city_part.toLowerCase())).slice(0, 5)
    res.json(matchingCities)
})
