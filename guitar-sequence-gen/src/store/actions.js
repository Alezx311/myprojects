import { CHANGE_PATTERN_SIZE, CHANGE_PATTERN_PARTS } from './types'

export function setupChangeSize(size) {
  console.log(`Action setupChangeSize(size)`, size)
  return {
    type: CHANGE_PATTERN_SIZE,
    payload: size
  }
}
export function setupChangeParts(parts) {
  console.log(`Action setupChangeParts(parts)`, parts)
  return {
    type: CHANGE_PATTERN_PARTS,
    payload: parts
  }
}
