const express = require('express')
const path = require('path')
const { SERVER_PORT } = require('./config')
const app = express()

const indexRouter = require('./routes/index')

app.set(express.static, 'public')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', indexRouter)

app.listen(SERVER_PORT, err => {
  if (err) {
    throw new Error('Error on starting server!', err)
  } else {
    console.log(`Server listening on ${SERVER_PORT}`)
  }
})
