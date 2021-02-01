import CONSTANTS from './Constants'

export class Random {
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
