const fs = require('fs')

const citiesData = JSON.parse(fs.readFileSync('./cities/cities.json', 'utf8'))

class CityService {
    async getCity(cityPart) {
        const matchingCities = citiesData.filter(city => city.city.toLowerCase().includes(cityPart.toLowerCase())).slice(0, 5)
        return matchingCities
    }
}

module.exports = new CityService()