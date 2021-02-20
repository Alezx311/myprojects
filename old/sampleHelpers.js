/* // export default class SampleHelpers {
class SampleHelpers {
  static sample_entries = [
    ['bassoon', `A1,A2,A3,C2,C3,C4,E3,G1,G2,G3`],
    [
      'cello',
      `A2,A3,A4,As2,As3,As4,B2,B3,B4,C2,C3,C4,C5,Cs3,Cs4,D2,D3,D4,Ds2,Ds3,Ds4,E2,E3,E4,F2,v2,F2,F3,F4,Fs3,Fs4,G2,v2,G2,G3,G4,Gs2,Gs3,Gs4`
    ],
    ['contrabass', `A1,As0,B2,C1,Cs2,D1,E1,E2,Fs0,Fs1,G0,Gs1,Gs2`],
    ['organ', `A1,A2,A3,A4,A5,C1,C2,C3,C4,C5,C6,Ds1,Ds2,Ds3,Ds4,Ds5,Fs1,Fs2,Fs3,Fs4,Fs5`],
    [
      'piano',
      `A0,A1,A2,A3,A4,A5,A6,As0,As1,As2,As3,As4,As5,As6,B0,B1,B2,B3,B4,B5,B6,C0,C1,C2,C3,C4,C5,C6,C7,Cs0,Cs1,Cs2,Cs3,Cs4,Cs5,Cs6,D0,D1,D2,D3,D4,D5,D6,Ds0,Ds1,Ds2,Ds3,Ds4,Ds5,Ds6,E0,E1,E2,E3,E4,E5,E6,F0,F1,F2,F3,F4,F5,F6,Fs0,Fs1,Fs2,Fs3,Fs4,Fs5,Fs6,G0,G1,G2,G3,G4,G5,G6,Gs0,Gs1,Gs2,Gs3,Gs4,Gs5,Gs6`
    ],
    [
      'saxophone',
      `A3,A4,As2,As3,B2,B3,C3,C4,Cs2,Cs3,Cs4,D2,D3,D4,Ds2,Ds3,Ds4,E2,E3,E4,F2,F3,F4,Fs2,Fs3,Fs4,G2,G3,G4,Gs2,Gs3,Gs4`
    ],
    ['violin', `A3,A4,A5,A6,C4,C5,C6,C7,E4,E5,E6,G3,G4,G5,G6`],
    ['bass-electric', `As2,As3,As4,As5,Cs2,Cs3,Cs4,Cs5,Cs6,E2,E3,E4,E5,G2,G3,G4,G5`],
    [
      'guitar-acoustic',
      `A1,A2,A3,As1,As2,As3,B1,B2,B3,C2,C3,C4,Cs2,Cs3,Cs4,D1,D2,D3,D4,Ds1,Ds2,Ds3,E1,E2,E3,F1,F2,F3,Fs1,Fs2,Fs3,G1,G2,G3,Gs1,Gs2,Gs3`
    ],
    ['guitar-electric', `A2,A3,A4,A5,C3,C4,C5,C6,Cs2,Ds3,Ds4,Ds5,E2,Fs2,Fs3,Fs4,Fs5`],
    [
      'guitar-nylon',
      `A2,A3,A4,A5,As5,B1,B2,B3,B4,Cs3,Cs4,Cs5,D2,D3,D5,Ds4,E2,E3,E4,E5,Fs2,Fs3,Fs4,Fs5,G3,G5,Gs2,Gs4,Gs5`
    ]
  ].map(v => {
    const instrument = v[0]
    const notes = v[1]
    const notesArray = [...new Set([...v[1].split(',')])]
    const folder = `samples/${instrument}/`
    const samples = notesArray.map(f => `${folder}${f}.mp3`)
    const info = `Name: ${instrument}
  Folder: ${folder}
  List: ${notesArray}
  Notes: ${notes}
  Samples Finded: ${samples.length}`
    const data = { instrument, notes, folder, notesArray, samples, info }

    return [instrument, data]
  })
  static library = Object.fromEntries(this.sample_entries)
  static names = Object.keys(this.library)
  static info = Object.values(this.library)
  static getInstrumentData = inst => {
    const data = this.library[inst] ?? false
    if (!data) {
      throw new Error(`Invalid instrument name: ${inst}`)
    } else {
      return this.library[inst]
    }
  }
  static loadSamples = async inst => {
    const { samples } = await this.getInstrumentData(inst)
    return samples.map(s => {
      console.log('import s', s)
      import file from (s)
      return file
    })
  }
}

// console.log('bassoon', SampleHelpers.loadSamples('bassoon'))
// console.log('cello', SampleHelpers.loadSamples('cello'))
// console.log('contrabass', SampleHelpers.loadSamples('contrabass'))
// console.log('organ', SampleHelpers.loadSamples('organ'))
// console.log('piano', SampleHelpers.loadSamples('piano'))
// console.log('saxophone', SampleHelpers.loadSamples('saxophone'))
console.log('violin', SampleHelpers.loadSamples('violin'))
 */