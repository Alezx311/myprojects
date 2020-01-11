const TelegrafRouter = require('telegraf/router')

const RouteFunction = new TelegrafRouter(({ callbackQuery }) => {
  if (!callbackQuery.data) {
    return
  }
  const parts = callbackQuery.data.split(':')
  return {
    route: parts[0],
    state: {
      amount: parseInt(parts[1], 10) || 0
    }
  }
})


RouteFunction

// руты для клавиатур
// Настройки при старте
  .on('startWithForm')
  .on('startWithoutForm')
  .on('setUserNickname')
  .on('setUserAvatar')
  .on('setUserSign')
  .on('setUserFavouriteGenres')
  .on('setUserFavouriteBands')
  .on('setUserFavouriteSongs')
  .on('setUserInstruments')

  // главное меню
  .on('showSongsMenu')
  .on('showTracksMenu')
  .on('showJamsMenu')
  .on('showsUsersMenu')
  .on('showSettingsMenu')
  .on('showTestMenu')

  // меню песен
  .on('findSong')
  .on('changeSong')
  .on('addSong')
  .on('findSongByTitle')
  .on('findSongByArtist')
  .on('findSongByGenre')
  .on('findSongByRating')

  // меню треков
  .on('findTracks')
  .on('addTracks')
  .on('favouriteTracks')
  .on('myTracks')
  .on('findTracksByTempo')
  .on('findTracksByScale')
  .on('findTracksByGenre')
  .on('findTracksByBackingTrack')
  .on('findTracksByInstruments')
  .on('addTrackSetTempo')
  .on('addTrackSetScale')
  .on('addTrackSetGenre')
  .on('addTrackSetBackingTrack')
  .on('addTrackSetInstruments')
  .on('recordOnTrack')
  .on('deleteFromFavourite')
  .on('leaveComment')
  

exports.default = RouteFunction