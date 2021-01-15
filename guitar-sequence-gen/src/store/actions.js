import * as TYPES from './types'

export function setupChangeSize(Size) {
  return {
    type: TYPES.CHANGE_PATTERN_SIZE,
    payload: Size
  }
}
export function setupChangeParts(Parts) {
  return {
    type: TYPES.CHANGE_PATTERN_PARTS,
    payload: Parts
  }
}
export function generatePattern(buttonData) {
  return {
    type: TYPES.GENERATE_PATTERN,
    payload: { ...buttonData }
  }
}
export function playerPlay() {
  return {
    type: TYPES.PLAY,
    payload: {}
  }
}
export function playerPause() {
  return {
    type: TYPES.PAUSE,
    payload: {}
  }
}
export function playerRefresh() {
  return {
    type: TYPES.REFRESH,
    payload: {}
  }
}
export function changeInstrument(instrument) {
  return {
    type: TYPES.CHANGE_INSTRUMENT,
    payload: instrument
  }
}
export function changeState(message) {
  return {
    type: TYPES.CHANGE_STATE,
    payload: message
  }
}
