const botController = require('./controllers/botController')
const Router = require('express').Router

const botApiRouter = new Router()

botApiRouter.post('/city/save', botController.saveChatCity)
botApiRouter.post('/city/get', botController.getChatCity)

module.exports = botApiRouter