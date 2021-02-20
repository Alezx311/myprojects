//! Constant Values for using in generate values, validate, etc...
export const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
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
export const COLOR_CLASSNAMES = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'body',
  'white',
  'transparent'
]
export const COLOR_NAMES = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']
export const COLOR_CODES = [
  '#ff0000',
  '#ff4e00',
  '#db7b00',
  '#ffcc00',
  '#e4ed00',
  '#81d700',
  '#00ffb4',
  '#00ffea',
  '#00baff',
  '#3c00ff',
  '#a800ff',
  '#ff00fd'
]
export const GUITAR_TUNINGS = {
  'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
  'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
}
export const SYNTHS = [
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
export const DURATION_CHARS = ['n', 't', 'm', 'n']
export const INTERVAL_CHARS = ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']
export const INSTRUMENTS = {
  'bass-electric': [
    'As2.mp3',
    'As2.ogg',
    'As2.wav',
    'As3.mp3',
    'As3.ogg',
    'As3.wav',
    'As4.mp3',
    'As4.ogg',
    'As4.wav',
    'As5.mp3',
    'As5.ogg',
    'As5.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'Cs5.mp3',
    'Cs5.ogg',
    'Cs5.wav',
    'Cs6.mp3',
    'Cs6.ogg',
    'Cs6.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'E5.mp3',
    'E5.ogg',
    'E5.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G4.mp3',
    'G4.ogg',
    'G4.wav',
    'G5.mp3',
    'G5.ogg',
    'G5.wav'
  ],
  bassoon: [
    'A1.mp3',
    'A1.ogg',
    'A1.wav',
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'C2.mp3',
    'C2.ogg',
    'C2.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'G1.mp3',
    'G1.ogg',
    'G1.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav'
  ],
  cello: [
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'As2.mp3',
    'As2.ogg',
    'As2.wav',
    'As3.mp3',
    'As3.ogg',
    'As3.wav',
    'As4.mp3',
    'As4.ogg',
    'As4.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'B3.mp3',
    'B3.ogg',
    'B3.wav',
    'B4.mp3',
    'B4.ogg',
    'B4.wav',
    'C2.mp3',
    'C2.ogg',
    'C2.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'C5.mp3',
    'C5.ogg',
    'C5.wav',
    'cello.txt',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'D2.mp3',
    'D2.ogg',
    'D2.wav',
    'D3.mp3',
    'D3.ogg',
    'D3.wav',
    'D4.mp3',
    'D4.ogg',
    'D4.wav',
    'Ds2.mp3',
    'Ds2.ogg',
    'Ds2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'F2 v2.mp3',
    'F2 v2.ogg',
    'F2 v2.wav',
    'F2.mp3',
    'F2.ogg',
    'F2.wav',
    'F3.mp3',
    'F3.ogg',
    'F3.wav',
    'F4.mp3',
    'F4.ogg',
    'F4.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'G2 v2.mp3',
    'G2 v2.ogg',
    'G2 v2.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G4.mp3',
    'G4.ogg',
    'G4.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav',
    'Gs3.mp3',
    'Gs3.ogg',
    'Gs3.wav',
    'Gs4.mp3',
    'Gs4.ogg',
    'Gs4.wav'
  ],
  contrabass: [
    'A1.mp3',
    'A1.ogg',
    'A1.wav',
    'As0.mp3',
    'As0.ogg',
    'As0.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'C1.mp3',
    'C1.ogg',
    'C1.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'D1.mp3',
    'D1.ogg',
    'D1.wav',
    'E1.mp3',
    'E1.ogg',
    'E1.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'Fs0.mp3',
    'Fs0.ogg',
    'Fs0.wav',
    'Fs1.mp3',
    'Fs1.ogg',
    'Fs1.wav',
    'G0.mp3',
    'G0.ogg',
    'G0.wav',
    'Gs1.mp3',
    'Gs1.ogg',
    'Gs1.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav'
  ],
  'guitar-acoustic': [
    'A1.mp3',
    'A1.ogg',
    'A1.wav',
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'As1.mp3',
    'As1.ogg',
    'As1.wav',
    'As2.mp3',
    'As2.ogg',
    'As2.wav',
    'As3.mp3',
    'As3.ogg',
    'As3.wav',
    'B1.mp3',
    'B1.ogg',
    'B1.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'B3.mp3',
    'B3.ogg',
    'B3.wav',
    'C2.mp3',
    'C2.ogg',
    'C2.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'D1.mp3',
    'D1.ogg',
    'D1.wav',
    'D2.mp3',
    'D2.ogg',
    'D2.wav',
    'D3.mp3',
    'D3.ogg',
    'D3.wav',
    'D4.mp3',
    'D4.ogg',
    'D4.wav',
    'Ds1.mp3',
    'Ds1.ogg',
    'Ds1.wav',
    'Ds2.mp3',
    'Ds2.ogg',
    'Ds2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'E1.mp3',
    'E1.ogg',
    'E1.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'F1.mp3',
    'F1.ogg',
    'F1.wav',
    'F2.mp3',
    'F2.ogg',
    'F2.wav',
    'F3.mp3',
    'F3.ogg',
    'F3.wav',
    'Fs1.mp3',
    'Fs1.ogg',
    'Fs1.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'G1.mp3',
    'G1.ogg',
    'G1.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'Gs1.mp3',
    'Gs1.ogg',
    'Gs1.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav',
    'Gs3.mp3',
    'Gs3.ogg',
    'Gs3.wav'
  ],
  'guitar-electric': [
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'A5.mp3',
    'A5.ogg',
    'A5.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'C5.mp3',
    'C5.ogg',
    'C5.wav',
    'C6.mp3',
    'C6.ogg',
    'C6.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'Ds5.mp3',
    'Ds5.ogg',
    'Ds5.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'Fs5.mp3',
    'Fs5.ogg',
    'Fs5.wav'
  ],
  'guitar-nylon': [
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'A5.mp3',
    'A5.ogg',
    'A5.wav',
    'As5.mp3',
    'As5.ogg',
    'As5.wav',
    'B1.mp3',
    'B1.ogg',
    'B1.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'B3.mp3',
    'B3.ogg',
    'B3.wav',
    'B4.mp3',
    'B4.ogg',
    'B4.wav',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'Cs5.mp3',
    'Cs5.ogg',
    'Cs5.wav',
    'D2.mp3',
    'D2.ogg',
    'D2.wav',
    'D3.mp3',
    'D3.ogg',
    'D3.wav',
    'D5.mp3',
    'D5.ogg',
    'D5.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'E5.mp3',
    'E5.ogg',
    'E5.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'Fs5.mp3',
    'Fs5.ogg',
    'Fs5.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G5.mp3',
    'G5.ogg',
    'G5.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav',
    'Gs4.mp3',
    'Gs4.ogg',
    'Gs4.wav',
    'Gs5.mp3',
    'Gs5.ogg',
    'Gs5.wav'
  ],
  organ: [
    'A1.mp3',
    'A1.ogg',
    'A1.wav',
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'A5.mp3',
    'A5.ogg',
    'A5.wav',
    'C1.mp3',
    'C1.ogg',
    'C1.wav',
    'C2.mp3',
    'C2.ogg',
    'C2.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'C5.mp3',
    'C5.ogg',
    'C5.wav',
    'C6.mp3',
    'C6.ogg',
    'C6.wav',
    'Ds1.mp3',
    'Ds1.ogg',
    'Ds1.wav',
    'Ds2.mp3',
    'Ds2.ogg',
    'Ds2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'Ds5.mp3',
    'Ds5.ogg',
    'Ds5.wav',
    'Fs1.mp3',
    'Fs1.ogg',
    'Fs1.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'Fs5.mp3',
    'Fs5.ogg',
    'Fs5.wav'
  ],
  piano: [
    'A0.mp3',
    'A0.ogg',
    'A0.wav',
    'A1.mp3',
    'A1.ogg',
    'A1.wav',
    'A2.mp3',
    'A2.ogg',
    'A2.wav',
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'A5.mp3',
    'A5.ogg',
    'A5.wav',
    'A6.mp3',
    'A6.ogg',
    'A6.wav',
    'As0.mp3',
    'As0.ogg',
    'As0.wav',
    'As1.mp3',
    'As1.ogg',
    'As1.wav',
    'As2.mp3',
    'As2.ogg',
    'As2.wav',
    'As3.mp3',
    'As3.ogg',
    'As3.wav',
    'As4.mp3',
    'As4.ogg',
    'As4.wav',
    'As5.mp3',
    'As5.ogg',
    'As5.wav',
    'As6.mp3',
    'As6.ogg',
    'As6.wav',
    'B0.mp3',
    'B0.ogg',
    'B0.wav',
    'B1.mp3',
    'B1.ogg',
    'B1.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'B3.mp3',
    'B3.ogg',
    'B3.wav',
    'B4.mp3',
    'B4.ogg',
    'B4.wav',
    'B5.mp3',
    'B5.ogg',
    'B5.wav',
    'B6.mp3',
    'B6.ogg',
    'B6.wav',
    'C0.mp3',
    'C0.ogg',
    'C0.wav',
    'C1.mp3',
    'C1.ogg',
    'C1.wav',
    'C2.mp3',
    'C2.ogg',
    'C2.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'C5.mp3',
    'C5.ogg',
    'C5.wav',
    'C6.mp3',
    'C6.ogg',
    'C6.wav',
    'C7.mp3',
    'C7.ogg',
    'C7.wav',
    'Cs0.mp3',
    'Cs0.ogg',
    'Cs0.wav',
    'Cs1.mp3',
    'Cs1.ogg',
    'Cs1.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'Cs5.mp3',
    'Cs5.ogg',
    'Cs5.wav',
    'Cs6.mp3',
    'Cs6.ogg',
    'Cs6.wav',
    'D0.mp3',
    'D0.ogg',
    'D0.wav',
    'D1.mp3',
    'D1.ogg',
    'D1.wav',
    'D2.mp3',
    'D2.ogg',
    'D2.wav',
    'D3.mp3',
    'D3.ogg',
    'D3.wav',
    'D4.mp3',
    'D4.ogg',
    'D4.wav',
    'D5.mp3',
    'D5.ogg',
    'D5.wav',
    'D6.mp3',
    'D6.ogg',
    'D6.wav',
    'Ds0.mp3',
    'Ds0.ogg',
    'Ds0.wav',
    'Ds1.mp3',
    'Ds1.ogg',
    'Ds1.wav',
    'Ds2.mp3',
    'Ds2.ogg',
    'Ds2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'Ds5.mp3',
    'Ds5.ogg',
    'Ds5.wav',
    'Ds6.mp3',
    'Ds6.ogg',
    'Ds6.wav',
    'E0.mp3',
    'E0.ogg',
    'E0.wav',
    'E1.mp3',
    'E1.ogg',
    'E1.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'E5.mp3',
    'E5.ogg',
    'E5.wav',
    'E6.mp3',
    'E6.ogg',
    'E6.wav',
    'F0.mp3',
    'F0.ogg',
    'F0.wav',
    'F1.mp3',
    'F1.ogg',
    'F1.wav',
    'F2.mp3',
    'F2.ogg',
    'F2.wav',
    'F3.mp3',
    'F3.ogg',
    'F3.wav',
    'F4.mp3',
    'F4.ogg',
    'F4.wav',
    'F5.mp3',
    'F5.ogg',
    'F5.wav',
    'F6.mp3',
    'F6.ogg',
    'F6.wav',
    'Fs0.mp3',
    'Fs0.ogg',
    'Fs0.wav',
    'Fs1.mp3',
    'Fs1.ogg',
    'Fs1.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'Fs5.mp3',
    'Fs5.ogg',
    'Fs5.wav',
    'Fs6.mp3',
    'Fs6.ogg',
    'Fs6.wav',
    'G0.mp3',
    'G0.ogg',
    'G0.wav',
    'G1.mp3',
    'G1.ogg',
    'G1.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G4.mp3',
    'G4.ogg',
    'G4.wav',
    'G5.mp3',
    'G5.ogg',
    'G5.wav',
    'G6.mp3',
    'G6.ogg',
    'G6.wav',
    'Gs0.mp3',
    'Gs0.ogg',
    'Gs0.wav',
    'Gs1.mp3',
    'Gs1.ogg',
    'Gs1.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav',
    'Gs3.mp3',
    'Gs3.ogg',
    'Gs3.wav',
    'Gs4.mp3',
    'Gs4.ogg',
    'Gs4.wav',
    'Gs5.mp3',
    'Gs5.ogg',
    'Gs5.wav',
    'Gs6.mp3',
    'Gs6.ogg',
    'Gs6.wav'
  ],
  saxophone: [
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'As2.mp3',
    'As2.ogg',
    'As2.wav',
    'As3.mp3',
    'As3.ogg',
    'As3.wav',
    'B2.mp3',
    'B2.ogg',
    'B2.wav',
    'B3.mp3',
    'B3.ogg',
    'B3.wav',
    'C3.mp3',
    'C3.ogg',
    'C3.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'Cs2.mp3',
    'Cs2.ogg',
    'Cs2.wav',
    'Cs3.mp3',
    'Cs3.ogg',
    'Cs3.wav',
    'Cs4.mp3',
    'Cs4.ogg',
    'Cs4.wav',
    'D2.mp3',
    'D2.ogg',
    'D2.wav',
    'D3.mp3',
    'D3.ogg',
    'D3.wav',
    'D4.mp3',
    'D4.ogg',
    'D4.wav',
    'Ds2.mp3',
    'Ds2.ogg',
    'Ds2.wav',
    'Ds3.mp3',
    'Ds3.ogg',
    'Ds3.wav',
    'Ds4.mp3',
    'Ds4.ogg',
    'Ds4.wav',
    'E2.mp3',
    'E2.ogg',
    'E2.wav',
    'E3.mp3',
    'E3.ogg',
    'E3.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'F2.mp3',
    'F2.ogg',
    'F2.wav',
    'F3.mp3',
    'F3.ogg',
    'F3.wav',
    'F4.mp3',
    'F4.ogg',
    'F4.wav',
    'Fs2.mp3',
    'Fs2.ogg',
    'Fs2.wav',
    'Fs3.mp3',
    'Fs3.ogg',
    'Fs3.wav',
    'Fs4.mp3',
    'Fs4.ogg',
    'Fs4.wav',
    'G2.mp3',
    'G2.ogg',
    'G2.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G4.mp3',
    'G4.ogg',
    'G4.wav',
    'Gs2.mp3',
    'Gs2.ogg',
    'Gs2.wav',
    'Gs3.mp3',
    'Gs3.ogg',
    'Gs3.wav',
    'Gs4.mp3',
    'Gs4.ogg',
    'Gs4.wav'
  ],
  violin: [
    'A3.mp3',
    'A3.ogg',
    'A3.wav',
    'A4.mp3',
    'A4.ogg',
    'A4.wav',
    'A5.mp3',
    'A5.ogg',
    'A5.wav',
    'A6.mp3',
    'A6.ogg',
    'A6.wav',
    'C4.mp3',
    'C4.ogg',
    'C4.wav',
    'C5.mp3',
    'C5.ogg',
    'C5.wav',
    'C6.mp3',
    'C6.ogg',
    'C6.wav',
    'C7.mp3',
    'C7.ogg',
    'C7.wav',
    'E4.mp3',
    'E4.ogg',
    'E4.wav',
    'E5.mp3',
    'E5.ogg',
    'E5.wav',
    'E6.mp3',
    'E6.ogg',
    'E6.wav',
    'G3.mp3',
    'G3.ogg',
    'G3.wav',
    'G4.mp3',
    'G4.ogg',
    'G4.wav',
    'G5.mp3',
    'G5.ogg',
    'G5.wav',
    'G6.mp3',
    'G6.ogg',
    'G6.wav'
  ]
}
