const Extra = require('telegraf/extra')

const keyboards = {
  welcomeKeyboard: () => {
    return Extra.HTML().markup(m => m.inlineKeyboard([
      m.callbackButton('Пройти опрос', 'startWithForm'),
      m.callbackButton('Начать сразу', 'startWithoutForm')
    ], { column: 1 }))
  },
  startWizard: {
    setUserData:() => {
      return Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Выбрать никнейм', 'setUserNickname'),
        m.callbackButton('Выбрать аватар', 'setUserAvatar'),
        m.callbackButton('Выбрать подпись', 'setUserSign'),
      ], { column: 1 }))
    },
    setUserMusicData:() => {
      return Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Выбрать жанры', 'setUserFavouriteGenres'),
        m.callbackButton('Выбрать группы', 'setUserFavouriteBands'),
        m.callbackButton('Выбрать песни', 'setUserFavouriteSongs'),
        m.callbackButton('Выбрать инструменты', 'setUserInstruments'),
      ], { column: 1 }))
    },
  },
  mainMenu: {
    mainKeyboard: () => {
      return Extra.HTML().markup(m => m.inlineKeyboard([
        m.callbackButton('Песни', 'showSongsMenu'),
        m.callbackButton('Треки', 'showTracksMenu'),
        m.callbackButton('Джемы', 'showJamsMenu'),
        m.callbackButton('Пользователи', 'showsUsersMenu'),
        m.callbackButton('Настройки', 'showSettingsMenu'),
        m.callbackButton('Тест', 'showTestMenu'),
      ], { column: 1 }))
    },
    songs: {
      mainKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Поиск песни', 'findSong'),
          m.callbackButton('Изменить песню', 'changeSong'),
          m.callbackButton('Добавить песню', 'addSong'),
        ], { column: 1 }))
      },
      findSong: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Название', 'findSongByTitle'),
          m.callbackButton('Исполнитель', 'findSongByArtist'),
          m.callbackButton('Жанр', 'findSongByGenre'),
          m.callbackButton('Рейтинг', 'findSongByRating'),
        ], { column: 1 }))
      },
      changeSong: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Изменить ', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      addSong: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
    },
    tracks: {
      mainKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Найти треки', 'findTracks'),
          m.callbackButton('Добавить трек', 'addTracks'),
          m.callbackButton('Избранные', 'favouriteTracks'),
          m.callbackButton('Мои треки', 'myTracks'),
        ], { column: 1 }))
      },
      findTrack: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Темп', 'findTracksByTempo'),
          m.callbackButton('Тональность', 'findTracksByScale'),
          m.callbackButton('Направление', 'findTracksByGenre'),
          m.callbackButton('Backing track', 'findTracksByBackingTrack'),
          m.callbackButton('Инструмент', 'findTracksByInstruments'),
        ], { column: 1 }))
      },
      addTrack: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Темп', 'addTrackSetTempo'),
          m.callbackButton('Тональность', 'addTrackSetScale'),
          m.callbackButton('Направление', 'addTrackSetGenre'),
          m.callbackButton('Backing track', 'addTrackSetBackingTrack'),
          m.callbackButton('Инструмент', 'addTrackSetInstruments')
        ], { column: 1 }))
      },
      showFavouritesTracks: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Записать свой поверх', 'recordOnTrack'),
          m.callbackButton('Удалить из избранного', 'deleteFromFavourite'),
          m.callbackButton('Комментарий', 'leaveComment'),
        ], { column: 1 }))
      },
      showUserOwnTracks: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
    },
    jams: {
      mainKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      joinJam: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      createJam: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      historyJam: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
    },
    users: {
      mainKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      findByNickname: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      findByRating: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },

    },
    settings: {
      mainKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      settingsUser: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
      settingsFeed: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
          m.callbackButton('sss', 'sss'),
        ], { column: 1 }))
      },
    },
    other: {
      helpKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Команды', 'showCommands'),
          m.callbackButton('Меню', 'showMainMenu')
        ]))
      },
      onVoiceKeyboard: () => {
        return Extra.HTML().markup(m => m.inlineKeyboard([
          m.callbackButton('Найти похожие', 'findVoiceMatches'),
          m.callbackButton('Меню', 'showMainMenu')
        ]))
      },

    }
  },
}

module.exports = keyboards