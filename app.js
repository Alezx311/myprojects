const config = require('./config/config.js')
const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const PORT = config.port

const indexRouter = require('./routes/index')
const guitarRouter = require('./routes/guitar')
const drawRouter = require('./routes/draw')
const crudRouter = require('./routes/crud')
const chatRouter = require('./routes/chat')
const gamesRouter = require('./routes/games')
const testRouter = require('./routes/test')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRouter)
app.use('/guitar', guitarRouter)
app.use('/draw', drawRouter)
app.use('/crud', crudRouter)
app.use('/chat', chatRouter)
app.use('/games', gamesRouter)
app.use('/test', testRouter)

app.listen(PORT)

module.exports = app
