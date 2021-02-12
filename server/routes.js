const { Router } = require('express')
const { Files } = './helpers'

const samplesRouter = () =>
  Router()
    .get('/', (req, res) => res.json({ content: Files.samplesContent }))
    .get('/info', (req, res) => res.json(Files.loadInfo(req.body.instrument)))

module.exports = { samplesRouter }
