import TYPES from './types'
import * as Helpers from '../components/MelodyGenerator/Helpers'

const initialState = Helpers.initialState

export const reducers = (state = initialState, action) => {
  switch (action.type) {

    case TYPES.CHANGE_PATTERN_SIZE:
      return { ...state, size: action.payload }

    case TYPES.CHANGE_PATTERN_PARTS:
      return { ...state, parts: action.payload }

    case TYPES.LIST_BUTTON_CLICK:
      
      return { ...state, ...action.payload, patterns }
    default:
      return state
  }
}
