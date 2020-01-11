var mongoose = require('mongoose')
var Schema = mongoose.Schema

let TrackSchema = new Schema({
  soundData: {
    tempo: Number,
    scale: String,
    instrument: String,
    backingTrack: { isBackingTrack: Boolean, backingTrackUrl: String },
  },
  additionalData: {
    title: String,
    author: String,
    recordedAt: Date,
    unploadedAt: Date,
    comments: { body: String, date: Date, author: String }
  },
})

let Track = mongoose.model('Track', TrackSchema)

exports.default = Track