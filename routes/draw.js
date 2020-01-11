var express = require('express')
var router = express.Router()
var http = require('http')

const server = http.createServer(express())
const io = require('socket.io')(server)

io.sockets.on('connection', socket => {
  console.log('Client ' + socket.id + ' connected successfully!')
  socket
    .on('mouse', data => socket.broadcast.emit('mouse', data))
    .on('disconnect', () => console.log('Client has been disconnected'))
})

server.listen(3001)
router.get('/', function(req, res, next) {
  res.render('draw')
});

module.exports = router;
