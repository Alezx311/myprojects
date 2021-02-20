const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { indexRouter } = require('./routes')
const { PORT } = process.env

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'files')))

app.use('/', indexRouter)

app.listen(PORT, err => {
  if (err) {
    console.error(`Error:`, err)
  } else {
    console.log(`Server started at ${PORT}`)
  }
})
