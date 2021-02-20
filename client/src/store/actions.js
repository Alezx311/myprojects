import { UPDATE_MELODY, UPDATE_GUITAR } from './types'

export const updateMelody = payload => ({ type: UPDATE_MELODY, payload })
export const updateGuitar = payload => ({ type: UPDATE_GUITAR, payload })
