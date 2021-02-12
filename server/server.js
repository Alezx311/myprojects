const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { samplesRouter } = require('./routes')
const PORT = process.env.DEV ? process.env.DEV_PORT : process.env.PROD_PORT

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'files')))

app.use('/samples', samplesRouter)

app.listen(PORT, err => {
  if (err) {
    console.error(`Error:`, err)
  } else {
    console.log(`Server started at ${PORT}`)
  }
})
