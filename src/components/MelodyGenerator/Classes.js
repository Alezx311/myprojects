const Joi = require('joi')

class CONSTANTS {
  static NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
  static SCALES = [
    'major',
    'minor',
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
    'majorpentatonic',
    'minorpentatonic',
    'chromatic',
    'harmonicchromatic',
    'blues',
    'doubleharmonic',
    'flamenco',
    'harmonicminor',
    'melodicminor',
    'wholetone'
  ]
  static SCALES_SHORT = [
    'major',
    'minor',
    'majorpentatonic',
    'minorpentatonic',
    'blues',
    'harmonicminor',
    'melodicminor'
  ]
  static TUNINGS = {
    'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
    'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
    'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
    'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
  }
}
class Matchers {
  static check = arr => arr?.[1] ?? false
  static noteChar = str => str && this.check(str.match(/^[a-g#]{1,2}/i))
  static octave = str => str && this.check(str.match(/(\\d)$/i))
  static noteCharAndOctave = str => str && { noteChar: this.noteChar, octave: this.octave }
  static durationSymbol = str => str && this.check(str.match(/[ntms]/i))
}
class Random {
  static Range = () => Math.random()
  static Number = ({ min = 1, max = 100 }) => Math.floor(Math.random() * (max - min + 1)) + min
  static PowerOfTwo = ({ max = 5 }) => 2 ** this.Number({ max })
  static Values = ({ arrayLength = 100 }) => Array(arrayLength).fill(1)
  static ArrayIndex = arr => arr && this.Number(arr.length)
  static ArrayElement = arr => arr && arr[this.Number(arr.length)]
  static Chance = ({ percents = 50 }) => this.Number() > percents
  static Octave = ({ min = 1, max = 6 }) => this.Number({ min, max })
  static Note = (arr = CONSTANTS.NOTES) => arr && this.ArrayElement(arr)
  static NoteAndOctave = (arr = CONSTANTS.NOTES) => arr && `${this.ArrayElement(arr)}${this.Octave()}`
  static TuningName = (arr = Object.keys(CONSTANTS.TUNINGS)) => arr && this.ArrayElement(arr)
  static ScaleName = (arr = CONSTANTS.SCALES) => arr && this.ArrayElement(arr)
  static DurationSymbol = (arr = ['n', 't', 's', 'm']) => this.ArrayElement(arr)
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  static DurationAbsolute = () => this.Range({ min: 0.001, max: 1000 }).toFixed(2)
  static InstrumentName = (arr = CONSTANTS.INSTRUMENT_NAMES) => arr && this.ArrayElement(arr)
  static SynthName = (arr = CONSTANTS.SYNTH_NAMES) => arr && this.ArrayElement(arr)
  static SampleName = (arr = CONSTANTS.SAMPLE_NAMES) => arr && this.ArrayElement(arr)
  static SampleNoteNames = obj => obj && Object.keys(obj)
  static Sorting = arr => arr.sort(() => this.Range() - 0.5)
  static Phrase = ({ notes = CONSTANTS.NOTES, phraseLength = 4 }) =>
    notes.length && this.Values({ phraseLength }).map(() => this.ArrayElement(notes))
  static PhrasesArray = ({ notes = CONSTANTS.NOTES, phraseLength = 4 }) =>
    notes && [...new Set([...this.Values().map(() => this.Phrase({ notes, phraseLength }))])]
}
class Validate {
  static check = schema => Joi.isSchema(schema) && schema.validate(schema)
  static Boolean = v => this.check(Joi.boolean(v))
  static True = v => v === true
  static Truthy = v => v ?? false
  static String = v => this.check(Joi.string(v))
  static Array = v => this.check(Joi.string(v))
  static Object = v => this.check(Joi.string(v))
  static Range = v => v > 0.0001 && v < 0.9999
  static Number = v => v > 0
  static PowerOfTwo = v => v % 2 === 0
  static Chance = v => v > 0 && v < 100
  static Octave = v => v > 0
  // static Note = v => CONSTANTS.NOTES.includes(v)
  static Note = v => this.check(Joi.string(v).pattern(/^[a-g#]+$/i))
  static NoteAndOctave = v => this.check(Joi.string(v).pattern(/^[a-g#]+[0-9]$/i))
  static NotesArray = v => this.check(Joi.array(v).items(this.Note))
  static TuningName = v => Object.keys(CONSTANTS.TUNINGS).includes(v)
  static ScaleName = v => CONSTANTS.SCALES.includes(v)
  // static DurationSymbol = v => CONSTANTS.DURATION_SYMBOLS.includes(v)
  static DurationSymbol = v => this.check(Joi.string(v).pattern(/^[ntms]$/i))
  static DurationRelative = v => this.check(Joi.string(v).pattern(/^1|2|4|8|16|32|64[nmts]$/i))
  static DurationAbsolute = v => v > 0 && v < 9999
  static InstrumentName = v => CONSTANTS.INSTRUMENT_NAMES.includes(v)
  static SynthName = v => CONSTANTS.SYNTH_NAMES.includes(v)
  static SampleName = v => CONSTANTS.SAMPLE_NAMES.includes(v)
  static SampleNoteNames = v => this.check(Joi.array(v).items(this.Note))
  static Phrase = v => this.NotesArray(v)
  static PhrasesArray = v => this.check(Joi.array(v).items(this.NotesArray))
}

module.exports = {
  Matchers,
  Random,
  Validate
}
