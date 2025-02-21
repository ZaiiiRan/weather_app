const chatCityService = require("../services/chatCityService")

class BotController {
    async saveChatCity(req, res) {
        try {
            const { chat_id, city, pass } = req.body
            if (pass === process.env.BOT_PASSWORD) {
                await chatCityService.saveChatCity(chat_id, city)
                res.status(200).send("Город успешно сохранен")
            } else {
                res.status(500).send()
            }
        } catch (error) {
            console.error('Ошибка при сохранении города:', error)
            res.status(500).send()
        }
    }

    async getChatCity(req, res) {
        try {
            const { chat_id, pass } = req.body
            if (pass === process.env.BOT_PASSWORD) {
                const result = await chatCityService.getChatCity(chat_id)
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
    }
}

module.exports = new BotController()