const { Validate } = require('../Classes')

const values = {
  boolean: true,
  truthy: 'true',
  range: 0.1,
  number: 8,
  note: 'C',
  octave: '2',
  noteAndOctave: 'D4',
  durationSymbol: 'n',
  durationRelative: '4n',
  tuningName: 'Drop D',
  scaleName: 'minor',
  instrumentName: 'flute',
  synthName: 'DuoSynth',
  sampleName: 'bassoon',
  notesArray: ['C2', 'E2', 'D2'],
  null: null
}

describe('Random', () => {
  it('Boolean', () => {
    const result = Validate.Boolean(values.boolean)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Truthy', () => {
    const result = Validate.Truthy(values.truthy)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('True', () => {
    const result = Validate.True(values.boolean)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('String', () => {
    const result = Validate.String(values.truthy)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Range', () => {
    const result = Validate.Range(values.range)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Number', () => {
    const result = Validate.Number(values.number)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('PowerOfTwo', () => {
    const result = Validate.PowerOfTwo(values.number)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Values', () => {
    const result = Validate.Values([values.number, values.number, values.number])
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('ArrayIndex', () => {
    const result = Validate.ArrayIndex(values.number)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('ArrayElement', () => {
    const result = Validate.ArrayElement(values.number)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Chance', () => {
    const result = Validate.Chance(values.number)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Octave', () => {
    const result = Validate.Octave(values.octave)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Note', () => {
    const result = Validate.Note(values.note)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('NoteAndOctave', () => {
    const result = Validate.NoteAndOctave(values.noteAndOctave)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('NotesArray', () => {
    const result = Validate.NotesArray(values.notesArray)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('TuningName', () => {
    const result = Validate.TuningName(values.tuningName)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('ScaleName', () => {
    const result = Validate.ScaleName(values.scaleName)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('DurationSymbol', () => {
    const result = Validate.DurationSymbol(true)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('DurationRelative', () => {
    const result = Validate.DurationRelative(values.durationRelative)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('DurationAbsolute', () => {
    const result = Validate.DurationAbsolute(values.range)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('InstrumentName', () => {
    const result = Validate.InstrumentName(values.instrumentName)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('SynthName', () => {
    const result = Validate.SynthName(values.synthName)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('SampleName', () => {
    const result = Validate.SampleName(values.sampleName)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('SampleNoteNames', () => {
    const result = Validate.SampleNoteNames(values.notesArray)
    const resultFalse = Validate.Boolean(values.null)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('Phrase', () => {
    const result = Validate.Phrase(true)
    const resultFalse = Validate.Boolean(values.notesArray)

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
  it('PhrasesArray', () => {
    const result = Validate.PhrasesArray(true)
    const resultFalse = Validate.Boolean([values.notesArray])

    expect(result).toBe(true)
    expect(resultFalse).not.toBeTruthy()
  })
})
