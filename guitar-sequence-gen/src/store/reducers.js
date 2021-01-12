import { combineReducers } from 'redux'
import { CHANGE_PATTERN_SIZE, CHANGE_PATTERN_PARTS } from './types'

const initialStates = {
  setup: {
    size: 4,
    parts: 4,
    key: 'C',
    start_octave: 2,
    scale: 'minor'
  },
  player: {},
  list: {},
  view: {}
}

const setupReducer = (state = initialStates.setup, action) => {
  switch (action.type) {
    case CHANGE_PATTERN_SIZE:
      return { ...state, size: action.payload }
    case CHANGE_PATTERN_PARTS:
      return { ...state, parts: action.payload }
    default:
      return state
  }
}
const playerReducer = (state = initialStates.player, action) => {
  switch (action.type) {
    // case CHANGE_PATTERN_SIZE
    // case CHANGE_PATTERN_PARTS
    default:
      return state
  }
}
const listReducer = (state = initialStates.list, action) => {
  switch (action.type) {
    // case CHANGE_PATTERN_SIZE
    // case CHANGE_PATTERN_PARTS
    default:
      return state
  }
}
const viewReducer = (state = initialStates.view, action) => {
  switch (action.type) {
    // case CHANGE_PATTERN_SIZE
    // case CHANGE_PATTERN_PARTS
    default:
      return state
  }
}

export const combinedReducer = combineReducers({
  setup: setupReducer,
  player: playerReducer,
  list: listReducer,
  view: viewReducer
})
