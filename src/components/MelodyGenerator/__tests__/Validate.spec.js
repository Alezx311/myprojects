const Joi = require('joi')
const { floor, random } = Math

const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
const DURATION_SYMBOLS = ['n', 't', 'm', 'n']
class Random {
  //* generate random range -> range > 0.01 && range < 0.99
  static Range = () => +random().toFixed(2)
  //* generate random number -> number > min && number < max
  static Number = (min = 1, max = 100) => floor(random() * (max - min + 1)) + min
  //* generate random power of 2 number -> 2,4,8,16,32,64...
  static PowerOfTwo = (maxPower = 5) => 2 ** this.Number(1, maxPower)
  //* generate random array with given length
  static Array = (arrayLength = 10) => Array(arrayLength).fill(1)
  //* get random element from given array
  static ArrayElement = (arr = ['invalid array']) => [...arr, ...arr][this.Number(0, arr.length)]
  //* get random note char like: 'c', 'd#', 'bb' with possible '#' and 'b' symbols
  static NoteChar = (notesArray = NOTES) => this.ArrayElement(notesArray)
  //* get random octave in given range (min is 1 and max is 6 for default)
  static Octave = (minOctave = 1, maxOctave = 6) => this.Number(minOctave, maxOctave)
  //* get random note char and join it with octave like: 'c2', 'd3', 'bb5'...
  static NoteCharAndOctave = (chars = NOTES, maxOctave = 6) => `${this.ArrayElement(chars)}${this.Octave(maxOctave)}`
  //* get random music note duration symbol
  static DurationSymbol = () => this.ArrayElement(DURATION_SYMBOLS)
  //* get random music note duration value and symbol. for example, '1n' is full note, '4n' is fourth
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  //* get absolute duration value. 1 is one second, for example
  static DurationAbsolute = () => this.Range()
}

class Validate {
  static Boolean = v => Joi.boolean().validate(v)?.error ?? true
  static String = v => Joi.string().validate(v)?.error ?? true
  static Array = v => Joi.array().validate(v)?.error ?? true
  static Object = v => Joi.object().validate(v)?.error ?? true
  static Range = v => Joi.number().min(0.01).max(0.99).validate(v)?.error ?? true
  static Number = v => Joi.number().min(1).max(100).validate(v)?.error ?? true
  static PowerOfTwo = v => Joi.number().min(1).max(64).validate(v)?.error ?? true
  static Octave = v => Joi.number().min(1).max(6).validate(v)?.error ?? true
  static NoteChar = v =>
    Joi.string()
      .min(1)
      .max(2)
      .pattern(/^[a-g#]+$/i)
      .validate(v)?.error ?? true
  static NoteCharAndOctave = v =>
    Joi.string()
      .min(2)
      .max(3)
      .pattern(/^[a-g#]+[1-6]$/i)
      .validate(v)?.error ?? true
  static NotesArray = v => Joi.array().items(this.NoteChar).validate(v)?.error ?? true
  static DurationSymbol = v =>
    Joi.string()
      .pattern(/^[ntms]$/i)
      .validate(v)?.error ?? true
  static DurationRelative = v =>
    Joi.string()
      .pattern(/^1|2|4|8|16|32|64[nmts]$/i)
      .validate(v)?.error ?? true
  static DurationAbsolute = v => Joi.number().min(0.001).max(10000).validate(v)?.error ?? true
}

describe('Validate', () => {
  it('Boolean', () => {
    const result = Validate.Boolean(true)

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('String', () => {
    const result = Validate.String('Random.String()')

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('Array', () => {
    const result = Validate.Array(Random.Array())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('Object', () => {
    const result = Validate.Object({ range: Random.Range() })

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('Range', () => {
    const result = Validate.Range(Random.Range())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('Number', () => {
    const result = Validate.Number(Random.Number())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('PowerOfTwo', () => {
    const result = Validate.PowerOfTwo(Random.PowerOfTwo())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('Octave', () => {
    const result = Validate.Octave(Random.Octave())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('NoteChar', () => {
    const result = Validate.NoteChar(Random.NoteChar())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('NoteCharAndOctave', () => {
    const result = Validate.NoteCharAndOctave(Random.NoteCharAndOctave())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('NotesArray', () => {
    const result = Validate.NotesArray(Random.Array(10).map(v => Random.NoteChar()))

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('DurationSymbol', () => {
    const result = Validate.DurationSymbol(Random.DurationSymbol())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('DurationRelative', () => {
    const result = Validate.DurationRelative(Random.DurationRelative())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
  it('DurationAbsolute', () => {
    const result = Validate.DurationAbsolute(Random.DurationAbsolute())

    expect(result).toBe(true)
    // expect(result.value).toBeDefined()
    // expect(result.error).not.toBeDefined()
  })
})
