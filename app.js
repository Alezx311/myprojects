const express = require('express')
const config = require('./config/config.js')
// const DATABASE = require('./config/database')
const path = require('path')
const PORT = config.port

const indexRouter = require('./routes/index')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRouter)

app.listen(3001)
