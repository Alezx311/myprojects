const { Validate } = require('../Values')

describe('Validate', () => {
  it('Boolean', () => {
    const result = Validate.Boolean(true)

    expect(result).toBe(true)
  })
  it('String', () => {
    const result = Validate.String('Random.String()')

    expect(result).toBe(true)
  })
  it('Array', () => {
    const result = Validate.Array([1, 2, 3])

    expect(result).toBe(true)
  })
  it('Object', () => {
    const result = Validate.Object({ str: 'text' })

    expect(result).toBe(true)
  })
  it('Range', () => {
    const result = Validate.Range(0.5)

    expect(result).toBe(true)
  })
  it('Number', () => {
    const result = Validate.Number(42)

    expect(result).toBe(true)
  })
  it('PowerOfTwo', () => {
    const result = Validate.PowerOfTwo(16)

    expect(result).toBe(true)
  })
  it('Octave', () => {
    const result = Validate.Octave(2)

    expect(result).toBe(true)
  })
  it('NoteChar', () => {
    const result = Validate.NoteChar('C')

    expect(result).toBe(true)
  })
  it('NoteCharAndOctave', () => {
    const result = Validate.NoteCharAndOctave('C2')

    expect(result).toBe(true)
  })
  it('NotesArray', () => {
    const result = Validate.NotesArray(['C', 'D', 'E'])

    expect(result).toBe(true)
  })
  it('DurationSymbol', () => {
    const result = Validate.DurationSymbol('n')

    expect(result).toBe(true)
  })
  it('DurationRelative', () => {
    const result = Validate.DurationRelative('4n')

    expect(result).toBe(true)
  })
  it('DurationAbsolute', () => {
    const result = Validate.DurationAbsolute(1)

    expect(result).toBe(true)
  })
})
