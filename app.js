'use strict'

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./router')
const config = require('./config')

// initial apps instance
const app = express()
const server = http.createServer(app)


// apply middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(router)

// listen
server.listen(config.port, () => {
    console.log('logger server running at port ' + config.port)
})
