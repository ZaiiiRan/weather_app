const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const fs = require('fs')
require('dotenv').config()
const https = require('https')
const http = require('http')
const db = require('./db/db')
const apiRouter = require('./api/router')
const botApiRouter = require('./botApi/router')
const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
}

app.use(express.json())
app.use(apiRouter)
app.use('/bot', botApiRouter)

const httpPort = 3031 //for http_api (bot)
const httpsPort = 3030 //other

const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app)

httpServer.listen(httpPort, () => {
    console.log(`HTTP сервер запущен на порте ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS сервер запущен на порте ${httpsPort}`)
})

app.use(express.static(`${process.env.BUILD_FORLDER}`))
app.get('/', async (req, res) => {
    if (!req.secure) {
        const host = req.get('host')
        res.redirect(`https://${host}${req.originalUrl}`)
    } else {
        res.sendFile(`${process.env.BUILD_FORLDER}/index.html`, { root: __dirname })
    }
})
