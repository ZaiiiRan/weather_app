const apiController = require('./controllers/apiController')
const Router = require('express').Router

const apiRouter = new Router()

apiRouter.get('/weather/:city', apiController.getWeather)
apiRouter.get('/city/:city_part', apiController.getCity)

module.exports = apiRouter