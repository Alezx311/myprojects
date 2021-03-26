require('dotenv').config()

const express = require('express')
const ecstatic = require('ecstatic')
const http = require('http')
const searchRouter = require('./routes/search')
const { PORT } = process.env

const app = express()

app.use(
  '/',
  ecstatic({
    root: `${__dirname}/public`,
    showDir: true
  })
)
app.use('/search', searchRouter)

http.createServer(app).listen(PORT)

console.log(`Server ready at http://localhost:${PORT}`)
