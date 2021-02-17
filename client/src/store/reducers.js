import { combineReducers } from 'redux'
import { UPDATE_MELODY, UPDATE_GUITAR } from './types'

const melodyState = {
  key: 'C',
  scale: 'minor',
  size: '20',
  patterns: '4',
  instrument: 'guitar'
}
const guitarState = {
  strings: 6,
  frets: 24,
  tuning: 'Drop D',
  sound: 'guitar-acoustic'
}

export const melodyReducer = (state = melodyState, { type, payload }) => {
  switch (type) {
    case UPDATE_MELODY:
      return { ...state, ...payload }
    default:
      return state
  }
}
export const guitarReducer = (state = guitarState, { type, payload }) => {
  switch (type) {
    case UPDATE_GUITAR:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const rootReducer = combineReducers({ melody: melodyReducer, guitar: guitarReducer })
