//! Constant Values for using in generate values, validate, etc...
// Note Symbols in #
export const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
// Music Scale Names
export const SCALES = [
  'major',
  'minor',
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
  'majorpentatonic',
  'minorpentatonic',
  'chromatic',
  'harmonicchromatic',
  'blues',
  'doubleharmonic',
  'flamenco',
  'harmonicminor',
  'melodicminor',
  'wholetone'
]
// Guitar tunings
export const TUNINGS = {
  'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
  'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
}
// Guitar tuning names
export const TUNING_NAMES = Object.keys(TUNINGS)
// Sample instruments
// export const INSTRUMENT_NAMES = [
//   'bass-electric',
//   'bassoon',
//   'cello',
//   'contrabass',
//   'guitar-acoustic',
//   'guitar-electric',
//   'guitar-nylon',
//   'organ',
//   'piano',
//   'saxophone',
//   'violin'
// ]
export const INSTRUMENT_ENTRIES = [
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
  ['guitar-nylon', `A2,A3,A4,A5,As5,B1,B2,B3,B4,Cs3,Cs4,Cs5,D2,D3,D5,Ds4,E2,E3,E4,E5,Fs2,Fs3,Fs4,Fs5,G3,G5,Gs2,Gs4,Gs5`]
].map(([name, notes]) => {
  const chars = [...new Set([...notes])]
  const files = chars.map(char => `${char}.mp3`)
  const urls = Object.fromEntries(chars.map((char, ind) => [char, files[ind]]))
  const baseUrl = `/samples/${name}/`
  const info = `Instrument ${name} Loaded!\bBase Url: ${baseUrl}\nSounds Finded: ${chars.length}`
  const onload = () => console.log(info)

  return [name, { chars, files, urls, baseUrl, info, onload }]
})
export const INSTRUMENT_SAMPLES = Object.fromEntries(INSTRUMENT_ENTRIES)
export const INSTRUMENT_NAMES = Object.keys(INSTRUMENT_SAMPLES)
// Tone.js Synths
export const SYNTH_NAMES = [
  'AMSynth',
  'FMSynth',
  'DuoSynth',
  'MembraneSynth',
  'MetalSynth',
  'MonoSynth',
  'NoiseSynth',
  'PluckSynth',
  'PolySynth',
  'Synth'
]
// Tone.js duration chars
export const DURATION_CHARS = ['n', 't', 'm', 'n']
// For convert note to color
export const COLORS = [
  '#00ff00',
  '#8000ff',
  '#00ffff',
  '#ff80c0',
  '#ff0000',
  '#ffff00',
  '#ff00ff',
  '#0080c0',
  '#808080',
  '#800000',
  '#ff8000',
  '#8080c0'
]
// For note interval finding
export const INTERVAL_CHARS = ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']
export const PROPS = {
  value: false,
  name: false,
  key: false,
  className: 'custom',
  text: 'TEXT',
  title: 'TITLE',
  content: 'CONTENT',
  bgColor: false,
  onClick: false,
  onChange: false
}

// All in one
const CONSTANTS = {
  NOTES,
  SCALES,
  TUNINGS,
  TUNING_NAMES,
  INSTRUMENT_NAMES,
  INSTRUMENT_ENTRIES,
  INSTRUMENT_SAMPLES,
  SYNTH_NAMES,
  DURATION_CHARS,
  COLORS,
  INTERVAL_CHARS,
  PROPS
}

export default CONSTANTS
