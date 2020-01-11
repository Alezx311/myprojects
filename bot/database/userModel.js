var mongoose = require('mongoose')
var Schema = mongoose.Schema

let UserSchema = new Schema({
  name: {
    nickname: String,
    firstName: String,
    lastName: String,
  },
  avatar: String,
  sign: String,
  contacts: {
    phone: String,
    telegramId: String,
    soundcloud: String,
    spotify: String,
  }
})

let User = mongoose.model('User', UserSchema)

exports.default = User