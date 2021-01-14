// const Teoria = require('teoria')
import * as ToneHelpers from './ToneHelpers'
import * as MusicValues from './MusicValues'

export const initialState = {
  size: 4,
  parts: 4,
  key: 'C',
  octave_min: 2,
  octave_max: 6,
  scale: 'minor',
  patterns: {},
  sequence: [],
  isPlaying: false,
  text: '',
  symbol: '',
  fretboard_strings: 6,
  fretboard_frets: 24,
  fretboard_tuning: 'E Standart'
}
