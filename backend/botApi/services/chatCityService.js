const db = require('../../db/db')

class ChatCityService {
    async saveChatCity(chatID, city) {
        const collection = await this.getCollection()
        await collection.updateOne({ chat_id: chatID }, { $set: { city: city } }, { upsert: true })
    }

    async getChatCity(chatID) {
        const collection = await this.getCollection()
        const result = await collection.findOne({ chat_id: chatID }, { city: 1, _id: 0 })
        return result
    }

    async getCollection() {
        const database = await db.getDB()
        const collection = database.collection('cities')
        return collection
    }
}

module.exports = new ChatCityService()
