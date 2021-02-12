const { Files } = require('../helpers')

describe('Files', () => {
  it('dirPath', () => {
    const result = Files.dirPath()

    expect(result).toBe(`C:\\Programming\\myprojects\\server\\files\\samples`)
  })
  it('dirContent', () => {
    const result = Files.dirContent()

    expect(result).toEqual([
      'bass-electric',
      'bassoon',
      'cello',
      'contrabass',
      'guitar-acoustic',
      'guitar-electric',
      'guitar-nylon',
      'organ',
      'piano',
      'saxophone',
      'violin'
    ])
  })
  it('checkInstrumentName', () => {
    const result = Files.checkInstrumentName('violin')
    const resultInvalid = Files.checkInstrumentName('invalid name')

    expect(result).toBe(true)
    expect(resultInvalid).toBe(false)
  })
  it('loadInfo', () => {
    const result = Files.loadInfo('violin')

    expect(result.directory).toBeDefined()
    expect(result.content).toBeDefined()
    expect(result.samples).toBeDefined()
    expect(result.names).toBeDefined()
    expect(result.info).toBeDefined()
  })
})
