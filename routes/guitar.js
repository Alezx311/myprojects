var express = require('express'),
    router = express.Router()
    
router.get('/', (req, res) => {
  res.render('guitar')
})

router.get('/synth', (req, res) => {
  res.render('synth')
})

module.exports = router
