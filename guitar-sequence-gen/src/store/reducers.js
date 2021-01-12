import { CHANGE_PATTERN_SIZE, CHANGE_PATTERN_PARTS, LIST_BUTTON_CLICK } from './types'
import { Pattern } from '../components/MelodyGenerator/Helpers'

const initialState = {
  size: 4,
  parts: 4,
  note: 'C',
  octave_min: 2,
  octave_max: 6,
  scale: 'minor',
  patterns: {},
  sequence: [],
  isPlaying: false,
  text: '',
  symbol: ''
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PATTERN_SIZE:
      return { ...state, size: action.payload }
    case CHANGE_PATTERN_PARTS:
      return { ...state, parts: action.payload }
    case LIST_BUTTON_CLICK:
      const patterns = Pattern({ ...state, ...action.payload })

      return { ...state, ...action.payload, patterns }
    default:
      return state
  }
}
