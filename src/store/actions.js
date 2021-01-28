import * as TYPES from './types'

export function updateSound(data) {
  return {
    type: TYPES.UPDATE_SOUND,
    payload: data
  }
}
export function updateFretboard(data) {
  return {
    type: TYPES.UPDATE_FRETBOARD,
    payload: data
  }
}
export function updatePlayer(data) {
  return {
    type: TYPES.UPDATE_PLAYER,
    payload: data
  }
}
export function updateState(data) {
  return {
    type: TYPES.UPDATE_STATE,
    payload: data
  }
}
