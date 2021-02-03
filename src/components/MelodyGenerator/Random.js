import {
  NOTES,
  SCALES,
  TUNING_NAMES,
  INSTRUMENT_NAMES,
  SYNTH_NAMES,
  SAMPLES,
  SAMPLE_NAMES,
  DURATION_SYMBOLS
} from './Constants'

export class Random {
  //* generate random range -> range > 0.01 && range < 0.99
  static Range = () => +(0.5 + Math.random() / 5).toFixed(2)
  //* generate random number -> number > min && number < max
  static Number = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min
  //* generate random power of 2 number -> 2,4,8,16,32,64...
  static PowerOfTwo = (maxPower = 5) => 2 ** this.Number(1, maxPower)
  //* generate random array with given length
  static Array = (arrayLength = 10) => Array(arrayLength).fill(1)
  //* generate random array with given length and random range values
  static Values = (arrayLength = 10) => this.Array(arrayLength).map(this.Range)
  //* get random element from given array
  static ArrayElement = (arr = ['invalid array']) => [...arr, ...arr][this.Number(0, arr.length)]
  //* shuffle given array
  static ArrayShuffle = (arr = []) => [...new Set([...arr, ...arr, ...arr].sort((a, b) => Math.random() - 0.5))]
  //* get random note char like: 'c', 'd#', 'bb' with possible '#' and 'b' symbols
  static NoteChar = (notesArray = NOTES) => this.ArrayElement(notesArray)
  //* get random octave in given range (min is 1 and max is 6 for default)
  static Octave = (minOctave = 1, maxOctave = 6) => this.Number(minOctave, maxOctave)
  //* get random note char and join it with octave like: 'c2', 'd3', 'bb5'...
  static NoteCharAndOctave = (chars = NOTES, maxOctave = 6) => `${this.ArrayElement(chars)}${this.Octave(maxOctave)}`
  //* get random guitar tuning name
  static TuningName = () => this.ArrayElement(TUNING_NAMES)
  //* get random musical scale name
  static ScaleName = () => this.ArrayElement(SCALES)
  //* get random music note duration symbol
  static DurationSymbol = () => this.ArrayElement(DURATION_SYMBOLS)
  //* get random music note duration value and symbol. for example, '1n' is full note, '4n' is fourth
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  //* get array with durations
  static DurationRelativesArray = (arrayLength = 10) => this.Array(arrayLength).map(v => this.DurationRelative())
  //* get absolute duration value. 1 is one second, for example
  static DurationAbsolute = () => this.Range()
  //* get array with absolute durations
  static DurationAbsolutesArray = (arrayLength = 10) => this.Array(arrayLength).map(v => this.DurationAbsolute())
  //* get random instrument name, like: 'cello', 'violin', ...
  static InstrumentName = () => this.ArrayElement(INSTRUMENT_NAMES)
  //* get random synth name, like: 'polysynth', 'fmsynth', ...
  static SynthName = () => this.ArrayElement(SYNTH_NAMES)
  //* get random sample name, match with instrument name, but can be changed in future
  static SampleName = () => this.ArrayElement(SAMPLE_NAMES)
  //* get possible note samples for random sample instrument
  static SampleNoteNames = () => Object.keys(SAMPLES[this.SampleName()])
}