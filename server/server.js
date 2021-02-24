require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT

app.use(express.static('public'))
app.use(cors())
app.use(fileUpload())

app.get('/bliss', (req, res) => {
  if (!req.words) {
    return res.status(500).send({ message: 'Words for bliss not founded!' })
  }

  const images = Bliss.findByWords(req.words)

  if (images.length) {
    return res.status(200).send({ message: `${images.length} images finded!`, images })
  }
})

app.listen(PORT, err => {
  if (err) {
    console.error(err)
    process.exitCode = 1
  } else {
    console.info(`Server listening on ${PORT}`)
  }
})
