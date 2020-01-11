var express = require('express');
var router = express.Router();

let db = require('../config/database')
let Song = require('../models/Song')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('songs')
});

router.get('/songsInfo', (req, res) => {

})
router.post('/songsInfo', (req, res) => {

})
router.put('/songsInfo', (req, res) => {

})
router.delete('/songsInfo', (req, res) => {
  
})

module.exports = router;
