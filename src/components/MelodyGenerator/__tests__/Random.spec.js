const { Random, CONSTANTS } = require('../Classes')

const getArray = (size = 20) => Array(size).fill(1)
const getUnicals = (arr = getArray()) => [...new Set([...arr])]
const getUnicalNumbers = (size = 20) => getUnicals(getArray(size).map(Random.Number))

const RANGE_MIN = 0.001
const RANGE_MAX = 0.999
const NUMBER_MIN = 1
const NUMBER_MAX = 9999
const OCTAVE_MIN = 1
const OCTAVE_MAX = 6
const UNICAL_NUMBERS = getUnicalNumbers()

describe('Random', () => {
  it('Range', () => {
    const result = Random.Range()

    expect(result).toBeGreaterThanOrEqual(RANGE_MIN)
    expect(result).toBeLessThanOrEqual(RANGE_MAX)
  })
  it('Number', () => {
    const result = Random.Number()

    expect(result).toBeGreaterThanOrEqual(NUMBER_MIN)
    expect(result).toBeLessThanOrEqual(NUMBER_MAX)
  })
  it('PowerOfTwo', () => {
    const result = Random.PowerOfTwo()

    expect(result % 2).toBeEqual(0)
  })
  it('Values', () => {
    const result = Random.Values(7)

    expect(result).toHaveLength(7)
  })
  it('ArrayIndex', () => {
    const result = Random.ArrayIndex(UNICAL_NUMBERS)

    expect(result).toBeLessThanOrEqual(UNICAL_NUMBERS.length)
  })
  it('ArrayElement', () => {
    const result = Random.ArrayElement(UNICAL_NUMBERS)

    expect(UNICAL_NUMBERS).toContain(result)
  })
  it('Chance', () => {
    const result = Random.Chance()

    expect(result).toBeDefined()
  })
  it('Octave', () => {
    const result = Random.Octave()

    expect(result).toBeGreaterThanOrEqual(OCTAVE_MIN)
    expect(result).toBeLessThanOrEqual(OCTAVE_MAX)
  })
  it('Note', () => {
    const result = Random.Note()
    const { NOTES } = CONSTANTS

    expect(NOTES).toContain(result)
  })
  it('NoteAndOctave', () => {
    const result = Random.NoteAndOctave()

    expect(result.length).toBeGreaterThanOrEqual(2)
    expect(result.length).toBeLessThanOrEqual(3)
  })
  it('TuningName', () => {
    const result = Random.TuningName()
    const { TUNINGS } = CONSTANTS

    expect(TUNINGS).toContain(result)
  })
  it('ScaleName', () => {
    const result = Random.ScaleName()
    const { SCALES } = CONSTANTS

    expect(SCALES).toContain(result)
  })
  it('DurationSymbol', () => {
    const result = Random.DurationSymbol()
    const { DURATION_SYMBOLS } = CONSTANTS

    expect(DURATION_SYMBOLS).toContain(result)
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
    const { INSTRUMENT_NAMES } = CONSTANTS

    expect(INSTRUMENT_NAMES).toContain(result)
  })
  it('SynthName', () => {
    const result = Random.SynthName()
    const { SYNTH_NAMES } = CONSTANTS

    expect(SYNTH_NAMES).toContain(result)
  })
  it('SampleName', () => {
    const result = Random.SampleName()
    const { SAMPLE_NAMES } = CONSTANTS

    expect(SAMPLE_NAMES).toContain(result)
  })
  it('SampleNoteNames', () => {
    const result = Random.SampleNoteNames({ c4: 's', D2: 'ss' })

    expect(result).toContain('c4')
    expect(result).toContain('D2')
  })
  it('Sorting', () => {
    const numbersSorted = UNICAL_NUMBERS.sort((a, b) => a - b)
    const result = Random.Sorting(UNICAL_NUMBERS)
    const resultSorted = result.sort((a, b) => a - b)

    expect(resultSorted).toEqual(numbersSorted)
    expect(result).not.toBe(UNICAL_NUMBERS)
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
