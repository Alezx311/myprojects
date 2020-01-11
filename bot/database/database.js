const mongoose = require('mongoose')
const url = require('./config').database_url

mongoose.connection(url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .on('error', err => console.log(err))
  .once('open', () => console.log('Mongoose conection successfully!'))

module.exports = mongoose.connection