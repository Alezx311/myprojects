var mongoose = require('mongoose')
var Schema = mongoose.Schema

let songSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  albumArt: String,
  releaseDate: Date,
  genres: Array,
  duration: String,
  songInfo: {
    songStory: String,
    YoutubeUrl: String,
    covers: { artist: String, coverUrl: String },
    interestThings: String,
    lyricsOriginal: String,
    lyricsTranslates: { language: String, translatedLyricsContent: String },
    quotesAbout: { author: String, quote: String }
  },
  comments: { body: String, date: Date }
})

let Song = mongoose.model('Song', songSchema)

exports.default = Song