const { Matchers } = require('../Classes')

const NOTE_AND_OCTAVE = 'C2'
const DURATION = '4n'

describe('Matchers Test', () => {
  it('noteChar', () => {
    const result = Matchers.noteChar(NOTE_AND_OCTAVE)

    expect(result).toBeEqual('C')
  })
  it('octave', () => {
    const result = Matchers.octave(NOTE_AND_OCTAVE)

    expect(result).toBeEqual('2')
  })
  it('noteCharAndOctave', () => {
    const result = Matchers.noteCharAndOctave(NOTE_AND_OCTAVE)

    expect(result.noteChar).toBeDefined().toBeEqual('C')
    expect(result.octave).toBeDefined().toBeEqual('2')
  })
  it('durationSymbol', () => {
    const result = Matchers.durationSymbol(DURATION)

    expect(result).toBeEqual('n')
  })
})
