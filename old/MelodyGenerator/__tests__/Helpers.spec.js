const { Helpers } = require('../Values')

describe('Helpers Test', () => {
  it('ArrayUnicals', () => {
    const result = Helpers.ArrayUnicals([1, 1, 1, 1, 2, 2, 3])

    expect(result).toStrictEqual([1, 2, 3])
  })
  it('ArrayMerge', () => {
    const result = Helpers.ArrayMerge([1, 2, 3], [1, 2, 4], [4, 5])

    expect(result).toStrictEqual([1, 2, 3, 4, 5])
  })
  it('NoteToColor', () => {
    const result = Helpers.NoteToColor('C')

    expect(result).toBe('#ff0000')
  })
  it('ColorToNote', () => {
    const result = Helpers.ColorToNote('#ff0000')

    expect(result).toBe('C')
  })
  it('SomeArrayElementDouble', () => {
    const result = Helpers.SomeArrayElementDouble([1, 2, 3])

    expect(result.filter(v => v.length > 1)).toHaveLength(1)
  })
  it('SomeArrayElementChange', () => {
    const result = Helpers.SomeArrayElementChange([1, 2, 3])

    expect(result).not.toBe([1, 2, 3])
  })
  it('SplitNoteAndOctave', () => {
    const result = Helpers.SplitNoteAndOctave('C#2')

    expect(result.noteChar).toBe('C#')
    expect(result.octave).toBe('2')
  })
  it('ScaleNotes', () => {
    const result = Helpers.ScaleNotes('C2', 'minor')

    expect(result).toHaveLength(7)
  })
  it('ChordNotes', () => {
    const result = Helpers.ChordNotes('C')

    expect(result).toHaveLength(3)
  })
  it('IntervalNotes', () => {
    const result = Helpers.IntervalNotes('C', 'M3')

    expect(result.length).toBeDefined()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })
  it('NoteValues', () => {
    const result = Helpers.NoteValues('C2', 'minor')

    expect(result.Note).toBeDefined()
    expect(result.Scale).toBeDefined()
    expect(result.Chord).toBeDefined()
    expect(result.Interval).toBeDefined()
    expect(result.Intervals).toBeDefined()
    expect(result.Info).toBeDefined()
  })
  it('ObjStat', () => {
    const result = Helpers.ObjStat({ a: 'a', b: 'b', number: 42 })

    expect(result.length).toBeDefined()
    expect(result.length).toBeGreaterThanOrEqual(10)
  })
})
