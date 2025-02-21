const {MongoClient} = require('mongodb')

const db = (function() {
    let instance
    async function connectToDatabase() {
        const mongoUrl = 'mongodb://localhost:27017'
        const dbName = process.env.DB_NAME
        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true })
        await client.connect()
        return client.db(dbName)
    }

    return {
        getDB: async function() {
            if (!instance) {
                instance = await connectToDatabase()
                Object.freeze(instance)
            }
            return instance
        }
    }
})()

module.exports = db