import * as TYPES from './types'
import * as Tone from 'tone'
import * as Helpers from '../components/MelodyGenerator/Helpers'

export const reducers = (state = Helpers.initialState, action) => {
  switch (action.type) {
    case TYPES.CHANGE_PATTERN_SIZE:
      return { ...state, size: parseInt(action.payload) }
    case TYPES.CHANGE_PATTERN_PARTS:
      return { ...state, parts: parseInt(action.payload) }
    case TYPES.CHANGE_INSTRUMENT:
      state.instrument = Helpers.getInstrument(action.payload)

      return state
    case TYPES.GENERATE_PATTERN:
      const updated = Helpers.generateNotesObject({ ...state, ...action.payload })

      if (!updated.instrument) {
        updated.instrument = Helpers.getInstrument()
      }
      if (updated.track) {
        updated.track.stop()
        updated.track.dispose()
      }

      updated.track = Helpers.getSequence(updated)
      updated.track_dublicate = updated.track
      // updated.track_dublicate = Helpers.getSequence(updated)
      // updated.track_dublicate = Helpers.getPattern(updated)
      // updated.track = Helpers.getPattern(updated)

      return updated
    case TYPES.PLAY:
      state.track.start(0.1)
      state.track_dublicate.start(0.1)
      Tone.Transport.start(0.1)

      console.log('state.track', state.track.playbackRate)

      state.isPlaying = true

      return state
    case TYPES.PAUSE:
      Tone.Transport.stop()
      state.track.stop()
      state.track_dublicate.stop()

      state.isPlaying = false

      return state
    case TYPES.REFRESH:
      return state

    default:
      return state
  }
}
