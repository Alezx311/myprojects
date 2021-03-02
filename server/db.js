const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const url = process.env.MONGO_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connect = () => {
  if (!url || !options) {
    throw new Error('Invalid connect values')
  }

  mongoose.connect(url, options)
  let db = mongoose.connection
}
