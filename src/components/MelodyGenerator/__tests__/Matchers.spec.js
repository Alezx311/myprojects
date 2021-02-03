const { Matchers } = require('../Values')

describe('Matchers Test', () => {
  it('noteChar', () => {
    const result = Matchers.noteChar('C4')

    expect(result).toBe('C')
  })
  it('octave', () => {
    const result = Matchers.octave('C4')

    expect(result).toBe('4')
  })
  it('durationValue', () => {
    const result = Matchers.durationValue('16n')

    expect(result).toBe('16')
  })
  it('durationSymbol', () => {
    const result = Matchers.durationSymbol('16n')

    expect(result).toBe('n')
  })
})
