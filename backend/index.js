const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const fs = require('fs')
require('dotenv').config()
const https = require('https')
const http = require('http')
const {MongoClient} = require('mongodb')
const citiesData = JSON.parse(fs.readFileSync('./cities/cities.json', 'utf8'))
const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
}
const api_token = `${process.env.WEATHER_API_TOKEN}`

const httpPort = 3031 //for http_api (bot)
const httpsPort = 3030 //other

const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app)

const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'weather_telegram'
const collectionName = 'cities'
async function connectToDatabase() {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true })
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    return collection
}

httpServer.listen(httpPort, () => {
    console.log(`HTTP сервер запущен на порте ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS сервер запущен на порте ${httpsPort}`)
})

app.use(express.json())

app.use(express.static(`${process.env.BUILD_FORLDER}`))
app.get('/', async (req, res) => {
    if (!req.secure) {
        const host = req.get('host')
        res.redirect(`https://${host}${req.originalUrl}`)
    } else {
        res.sendFile(`${process.env.BUILD_FORLDER}/index.html`, { root: __dirname })
    }
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

app.post('/saveCity', async (req, res) => {
    try {
        const { chat_id, city, pass } = req.body
        if (pass === process.env.BOT_PASSWORD) {
            const collection = await connectToDatabase()
            const result = await collection.updateOne({ chat_id: chat_id }, { $set: { city: city } }, { upsert: true })
            res.status(200).send("Город успешно сохранен")
        } else {
            res.status(500).send()
        }
    } catch (error) {
        console.error('Ошибка при сохранении города:', error)
        res.status(500).send()
    }
})

app.post('/getCity', async (req, res) => {
    try {
        const { chat_id, pass } = req.body
        if (pass === process.env.BOT_PASSWORD) {
            const collection = await connectToDatabase()
            const result = await collection.findOne({ chat_id: chat_id }, { city: 1, _id: 0 })
            if (result) {
                res.status(200).json({ city: result.city })
            } else {
                res.status(404).send()
            }
        } else {
            res.status(500).send()
        }
    } catch (error) {
        console.error('Ошибка при чтении города:', error)
        res.status(500).send()
    }
})