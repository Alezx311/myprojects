const {
  Random,
  NOTES,
  SCALES,
  INSTRUMENT_NAMES,
  SYNTH_NAMES,
  SAMPLE_NAMES,
  TUNING_NAMES,
  DURATION_SYMBOLS,
  COLORS
} = require('../Values')

describe('Random', () => {
  it('Range', () => {
    const result = Random.Range()

    expect(result).toBeGreaterThanOrEqual(0.01)
    expect(result).toBeLessThanOrEqual(0.99)
  })
  it('Number', () => {
    const result = Random.Number()

    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(100)
  })
  it('PowerOfTwo', () => {
    const result = Random.PowerOfTwo()

    expect([2, 4, 8, 16, 32, 64, 128]).toContain(result)
  })
  it('Array', () => {
    const result = Random.Array(13)

    expect(result).toHaveLength(13)
  })
  it('Values', () => {
    const result = Random.Values(13)

    expect(result).toHaveLength(13)
  })
  it('ArrayElement', () => {
    const result = Random.ArrayElement([1, 2, 3])

    expect([1, 2, 3]).toContain(result)
  })
  it('ArrayShuffle', () => {
    const result = Random.ArrayShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    expect(result).not.toBe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
  it('NoteChar', () => {
    const result = Random.NoteChar()

    expect(NOTES).toContain(result)
  })
  it('Octave', () => {
    const result = Random.Octave()

    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThanOrEqual(6)
  })
  it('NoteCharAndOctave', () => {
    const result = Random.NoteCharAndOctave()

    expect(result).toMatch(/^[a-g#]+[2-6]$/i)
  })
  it('TuningName', () => {
    const result = Random.TuningName()

    expect(TUNING_NAMES).toContain(result)
  })
  it('ScaleName', () => {
    const result = Random.ScaleName()

    expect(SCALES).toContain(result)
  })
  it('DurationSymbol', () => {
    const result = Random.DurationSymbol()

    expect(DURATION_SYMBOLS).toContain(result)
  })
  it('DurationRelative', () => {
    const result = Random.DurationRelative()

    expect(result).toMatch(/^\d+[ntms]$/i)
  })
  it('DurationAbsolute', () => {
    const result = Random.DurationAbsolute()

    expect(result).toBeGreaterThanOrEqual(0.001)
    expect(result).toBeLessThanOrEqual(10000)
  })
  it('InstrumentName', () => {
    const result = Random.InstrumentName()

    expect(INSTRUMENT_NAMES).toContain(result)
  })
  it('SynthName', () => {
    const result = Random.SynthName()

    expect(SYNTH_NAMES).toContain(result)
  })
  it('SampleName', () => {
    const result = Random.SampleName()

    expect(SAMPLE_NAMES).toContain(result)
  })
  it('SampleNoteNames', () => {
    const result = Random.SampleNoteNames()

    expect(result.length).toBeDefined()
    expect(result.length).toBeGreaterThanOrEqual(3)
  })
  it('Bpm', () => {
    const result = Random.Bpm(60, 100)

    expect(result).toBeGreaterThanOrEqual(60)
    expect(result).toBeLessThanOrEqual(100)
  })
  it('Color', () => {
    const result = Random.Color()

    expect(COLORS).toContain(result)
  })
  it('Size', () => {
    const result = Random.Size(60, 100)

    expect(result).toBeGreaterThanOrEqual(60)
    expect(result).toBeLessThanOrEqual(100)
  })
  it('Position', () => {
    const result = Random.Position(60, 100)

    expect(result.x).toBeDefined()
    expect(result.x).toBeGreaterThanOrEqual(60)
    expect(result.x).toBeLessThanOrEqual(100)
    expect(result.y).toBeDefined()
    expect(result.y).toBeGreaterThanOrEqual(60)
    expect(result.y).toBeLessThanOrEqual(100)
  })
  it('Velocity', () => {
    const result = Random.Velocity()

    expect(result).toBeGreaterThanOrEqual(0.5)
    expect(result).toBeLessThanOrEqual(1)
  })
  it('NoteObject', () => {
    const result = Random.NoteObject()

    expect(result.noteChar).toBeDefined()
    expect(result.octave).toBeDefined()
    expect(result.noteAndOctave).toBeDefined()
    expect(result.duration).toBeDefined()
    expect(result.velocity).toBeDefined()
    expect(result.color).toBeDefined()
  })
  it('Phrases', () => {
    const result = Random.Phrases('C4', 'minor', 2, 20)

    expect(result.Note).toBeDefined()
    expect(result.Info).toBeDefined()
    expect(result.generateInfo).toBeDefined()

    expect(result.fromChordNotes).toBeDefined()
    expect(result.fromChordNotes.length).toBeGreaterThanOrEqual(1)

    expect(result.fromScaleNotes).toBeDefined()
    expect(result.fromScaleNotes.length).toBeGreaterThanOrEqual(1)

    expect(result.fromIntervalsScale).toBeDefined()
    expect(result.fromIntervalsScale.length).toBeGreaterThanOrEqual(1)

    expect(result.fromIntervalsSteps).toBeDefined()
    expect(result.fromIntervalsSteps.length).toBeGreaterThanOrEqual(1)

    expect(result.fromMerging).toBeDefined()
    expect(result.fromMerging.length).toBeGreaterThanOrEqual(1)
  })
})
