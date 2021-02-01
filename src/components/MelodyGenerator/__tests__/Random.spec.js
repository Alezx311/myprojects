const { Random, CONSTANTS } = require('../Classes')

const getArray = ({ size = 100 }) => Array(size).fill(1)
const getUnicalNumbers = ({ size = 100 }) => getUnicals(getArray(size).map(v => Random.Number()))
const RANGE_MIN = 0.001
const RANGE_MAX = 0.999
const NUMBER_MIN = 1
const NUMBER_MAX = 9999
const OCTAVE_MIN = 1
const OCTAVE_MAX = 6
const NUMBERS = getUnicalNumbers()
const getUnicals = getArray => getArray && [...new Set([...getArray])]

describe('Random', () => {
  it('Range', () => {
    const result = Random.Range()

    expect(result).toBeGreaterThanOrEqual(RANGE_MIN)
    expect(result).toBeLessThanOrEqual(RANGE_MAX)
  })
  it('Number', () => {
    const result = Random.Number()

    expect(result).toBeGreaterThanOrEqual(NUMBER_MIN)
    expect(result).toBeLessThanOrEqual(NUMBER_MIN)
  })
  it('PowerOfTwo', () => {
    const result = Random.PowerOfTwo()

    expect(result % 2).toBeEqual(0)
  })
  it('Values', () => {
    const result = Random.Values(13)

    expect(result).toHaveLength(13)
  })
  it('ArrayIndex', () => {
    const result = Random.Values(NUMBERS)

    expect(result).toBeLessThanOrEqual(NUMBERS.length)
  })
  it('ArrayElement', () => {
    const result = Random.Values(NUMBERS)

    expect(NUMBERS).toContain(result)
  })
  it('Chance', () => {
    const result = Random.Chance()

    expect(result).toBeBoolean()
  })
  it('Octave', () => {
    const result = Random.Octave()

    expect(result).toBeGreaterThanOrEqual(OCTAVE_MIN)
    expect(result).toBeLessThanOrEqual(OCTAVE_MAX)
  })
  it('Note', () => {
    const result = Random.Note()

    expect(CONSTANTS.NOTES).toContain(result)
  })
  it('NoteAndOctave', () => {
    const result = Random.NoteAndOctave()

    expect(result.length).toBeGreaterThanOrEqual(2)
    expect(result.length).toBeLessThanOrEqual(3)
  })
  it('TuningName', () => {
    const result = Random.TuningName()

    expect(Object.keys(CONSTANTS.TUNINGS)).toContain(result)
  })
  it('ScaleName', () => {
    const result = Random.ScaleName()

    expect(CONSTANTS.SCALES).toContain(result)
  })
  it('DurationSymbol', () => {
    const result = Random.DurationSymbol()

    expect(CONSTANTS.DURATION_SYMBOLS).toContain(result)
  })
  it('DurationRelative', () => {
    const result = Random.DurationRelative()

    expect(result).toMatch(/^\d+[ntms]$/)
  })
  it('DurationAbsolute', () => {
    const result = Random.DurationAbsolute()

    expect(result.length).toBeGreaterThanOrEqual(RANGE_MIN)
    expect(result.length).toBeLessThanOrEqual(NUMBER_MAX)
  })
  it('InstrumentName', () => {
    const result = Random.InstrumentName()

    expect(CONSTANTS.INSTRUMENT_NAMES).toContain(result)
  })
  it('SynthName', () => {
    const result = Random.SynthName()

    expect(CONSTANTS.SYNTH_NAMES).toContain(result)
  })
  it('SampleName', () => {
    const result = Random.SampleName()

    expect(Object.keys(CONSTANTS.SAMPLE_NAMES)).toContain(result)
  })
  it('SampleNoteNames', () => {
    const result = Random.SampleNoteNames({ c4: 's', D2: 'ss' })

    expect(result).toContain('c4')
    expect(result).toContain('D4')
  })
  it('Sorting', () => {
    const result = Random.Sorting(NUMBERS)

    expect(result).not.toBeEqual(NUMBERS)
  })
  it('Phrase', () => {
    const result = Random.Phrase()

    expect(result.length).toBeGreaterThanOrEqual(1)
  })
  it('PhrasesArray', () => {
    const result = Random.PhrasesArray()

    expect(result.length).toBeGreaterThanOrEqual(1)
  })
})
