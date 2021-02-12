import * as TYPES from './types'
import { Helpers } from '../components/helpers'

const initialState = {
  sound: {
    size: 100,
    parts: 20,
    key: 'C',
    octave: 4,
    scale: 'minorpentatonic',
    instrument: 'PolySynth'
  },
  fretboard: {
    strings: 6,
    frets: 24,
    tuning: 'E Standart'
  },
  player: {
    isPlaying: false,
    transport: null,
    track: null,
    instrument: null,
    melody: null,
    melodyView: {}
  }
}

const stopTrack = state => {
  let updated = { ...state }

  if (updated.player?.isPlaying === true) {
    updated.player?.track?.stop()
    updated.player?.transport?.stop()
    updated.player.isPlaying = false
  }

  return updated
}
const playTrack = state => {
  let updated = { ...state }

  if (updated.player.transport === null) {
    updated.player.transport = Helpers.getTransport()
  }

  if (updated.player.instrument === null) {
    updated.player.instrument = Helpers.getInstrument(updated.sound)
  }

  if (updated.player.melody === null) {
    updated.player.melody = Helpers.randomMelody(updated.sound)
  }

  if (updated.player.track === null) {
    updated.player.track = Helpers.getTrack(updated.player)
  }

  if (updated.player.isPlaying === false) {
    updated.player?.track?.start()
    updated.player?.transport?.start(0.1)
    updated.player.isPlaying = true
  }

  return updated
}

export const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    // case TYPES.UPDATE_SOUND: {
    //   return { ...state, sound: { ...state.sound, ...payload } }
    // }
    // case TYPES.UPDATE_FRETBOARD: {
    //   return { ...state, fretboard: { ...state.fretboard, ...payload } }
    // }
    // case TYPES.UPDATE_PLAYER: {
    //   const updated = payload === 'Play' ? playTrack(state) : stopTrack(state)
    //   return { ...state, ...updated }
    // }
    // case TYPES.UPDATE_STATE:
    //   return { ...state, ...payload }
    default:
      return { ...state }
  }
}
