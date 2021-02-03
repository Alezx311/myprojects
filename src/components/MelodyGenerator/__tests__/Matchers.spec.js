class Matchers {
  static noteChar = str => new RegExp('^[a-g#]+', 'i').exec(str).join()
  static octave = str => new RegExp('\\d$', 'i').exec(str).join()
  static durationValue = str => new RegExp('^\\d+', 'i').exec(str).join()
  static durationSymbol = str => new RegExp('[ntms]$', 'i').exec(str).join()
}

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
