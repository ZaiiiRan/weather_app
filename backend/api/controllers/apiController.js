const cityService = require("../services/cityService")
const weatherService = require("../services/weatherService")

class ApiController {
    async getWeather(req, res) {
        const {city} = req.params
        try {
            const weather = await weatherService.getWeather(city)
            res.json(weather)
        }
        catch (error) {
            res.status(500).send()
        }
    }

    async getCity(req, res) {
        const { city_part } = req.params
        const matchingCities = await cityService.getCity(city_part)
        res.json(matchingCities)
    }
}

module.exports = new ApiController()