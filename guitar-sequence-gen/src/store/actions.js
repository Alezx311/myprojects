import { CHANGE_PATTERN_SIZE, CHANGE_PATTERN_PARTS, LIST_BUTTON_CLICK } from './types'

export function setupChangeSize(Size) {
  return {
    type: CHANGE_PATTERN_SIZE,
    payload: Size
  }
}
export function setupChangeParts(Parts) {
  return {
    type: CHANGE_PATTERN_PARTS,
    payload: Parts
  }
}
export function listButtonClick(buttonData) {
  return {
    type: LIST_BUTTON_CLICK,
    payload: buttonData
  }
}
