import * as TYPES from './types'
import * as Helpers from '../components/MelodyGenerator/Helpers'

const generateTrack = state => {
  const update = Helpers.getSequence({ ...state })

  return { ...update }
}
const stopTrack = state => {
  if (state.isPlaying === true && state.track) {
    state.transport.stop()
    state.track.stop()
  }

  state.isPlaying = false

  return { ...state }
}
const playTrack = state => {
  if (!state.track) {
    state = Helpers.getSequence({ ...state })
  }

  state.transport.start()
  state.track.start()

  state.isPlaying = true

  return { ...state }
}

export const reducers = (state = Helpers.initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_PATTERN_SIZE:
      return { ...state, size: parseInt(action.payload) }
    case TYPES.CHANGE_PATTERN_PARTS:
      return { ...state, parts: parseInt(action.payload) }
    case TYPES.CHANGE_INSTRUMENT: {
      const update = Helpers.getInstrument({ ...state, instrument: action.payload })
      return update
    }
    case TYPES.GENERATE_PATTERN: {
      const update = Helpers.getSequence({ ...state, ...action.payload })
      return update
    }
    case TYPES.PLAY: {
      const update = playTrack(state)
      return update
    }
    case TYPES.PAUSE: {
      const update = stopTrack(state)
      return update
    }
    case TYPES.REFRESH: {
      const update = Helpers.getSequence(state)
      return update
    }
    case TYPES.CHANGE_STATE: {
      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}
