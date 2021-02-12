import TYPES from './types'

export function setupChangeSize(size) {
  return {
    type: TYPES.CHANGE_PATTERN_SIZE,
    payload: size
  }
}
export function setupChangeParts(parts) {
  return {
    type: TYPES.CHANGE_PATTERN_PARTS,
    payload: parts
  }
}
export function listButtonClick(buttonData) {
  return {
    type: TYPES.LIST_BUTTON_CLICK,
    payload: buttonData
  }
}