import { UPDATE_MELODY, UPDATE_GUITAR } from './types'

const createPayload = (property, value) => Object.fromEntries([[property, value]])

export const updateMelody = (property, value) => ({ type: UPDATE_MELODY, payload: createPayload(property, value) })
export const updateGuitar = (property, value) => ({ type: UPDATE_GUITAR, payload: createPayload(property, value) })
