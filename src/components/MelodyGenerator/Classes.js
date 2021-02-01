const Joi = require('joi')

// Notes Symbols Array
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
// Scale Names Array
const SCALES = [
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
// Scale Names Array (Shorted)
const SCALES_SHORT = ['major', 'minor', 'majorpentatonic', 'minorpentatonic', 'blues', 'harmonicminor', 'melodicminor']
// Guitar Tunings -> Object{name: openStringNote}
const TUNINGS = {
  'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
  'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
}
const INSTRUMENT_NAMES = [
  'bass-electric',
  'bassoon',
  'cello',
  'clarinet',
  'contrabass',
  'flute',
  'french-horn',
  'guitar-acoustic',
  'guitar-electric',
  'guitar-nylon',
  'harmonium',
  'harp',
  'organ',
  'piano',
  'saxophone',
  'trombone',
  'trumpet',
  'tuba',
  'violin',
  'xylophone'
]
// Инструменты из Tone.js
const SYNTH_NAMES = [
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
const SAMPLE_NAMES = {
  'bass-electric': {
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]'
  },
  bassoon: {
    A3: 'A3.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]'
  },
  cello: {
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B4: 'B4.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]'
  },
  clarinet: {
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]'
  },
  contrabass: {
    C1: 'C1.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    D1: 'D1.[mp3|ogg]',
    E1: 'E1.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    'F#0': 'Fs0.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    G0: 'G0.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]'
  },
  flute: {
    A5: 'A5.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]'
  },
  'french-horn': {
    D2: 'D2.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    A0: 'A0.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]'
  },
  'guitar-acoustic': {
    F3: 'F3.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    D1: 'D1.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    E1: 'E1.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]'
  },
  'guitar-electric': {
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]'
  },
  'guitar-nylon': {
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G5: 'G3.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B4: 'B4.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]'
  },
  harmonium: {
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]'
  },
  harp: {
    C5: 'C5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D6: 'D6.[mp3|ogg]',
    D7: 'D7.[mp3|ogg]',
    E1: 'E1.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    F6: 'F6.[mp3|ogg]',
    F7: 'F7.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B5: 'B5.[mp3|ogg]',
    B6: 'B6.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]'
  },
  organ: {
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]'
  },
  piano: {
    A0: 'A0.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'A#6': 'As6.[mp3|ogg]',
    B0: 'B0.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B4: 'B4.[mp3|ogg]',
    B5: 'B5.[mp3|ogg]',
    B6: 'B6.[mp3|ogg]',
    C0: 'C0.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    C7: 'C7.[mp3|ogg]',
    'C#0': 'Cs0.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'C#6': 'Cs6.[mp3|ogg]',
    D0: 'D0.[mp3|ogg]',
    D1: 'D1.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    D6: 'D6.[mp3|ogg]',
    'D#0': 'Ds0.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'D#6': 'Ds6.[mp3|ogg]',
    E0: 'E0.[mp3|ogg]',
    E1: 'E1.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    E6: 'E6.[mp3|ogg]',
    F0: 'F0.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    F5: 'F5.[mp3|ogg]',
    F6: 'F6.[mp3|ogg]',
    'F#0': 'Fs0.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    G0: 'G0.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    G6: 'G6.[mp3|ogg]',
    'G#0': 'Gs0.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    'G#6': 'Gs6.[mp3|ogg]'
  },
  saxophone: {
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]'
  },
  trombone: {
    'A#2': 'As2.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]'
  },
  trumpet: {
    C5: 'C5.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]'
  },
  tuba: {
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    F0: 'F0.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]'
  },
  violin: {
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    C7: 'C7.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    E6: 'E6.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    G6: 'G6.[mp3|ogg]'
  },
  xylophone: {
    C7: 'C7.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    G6: 'G6.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]'
  }
}
const DURATION_SYMBOLS = ['n', 't', 'm', 'n']
class Matchers {
  static check = arr => arr?.[1] ?? false
  static noteChar = str => str && this.check(str.match(/^[a-g#]{1,2}/i))
  static octave = str => str && this.check(str.match(/(\\d)$/i))
  static noteCharAndOctave = str => str && { noteChar: this.noteChar, octave: this.octave }
  static durationSymbol = str => str && this.check(str.match(/[ntms]/i))
}
class Random {
  static Range = () => Math.random()
  static Number = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min
  static PowerOfTwo = (max = 5) => 2 ** this.Number(max)
  static Values = (arrayLength = 100) => Array(arrayLength).fill(1)
  static ArrayIndex = arr => this.Number(arr.length)
  static ArrayElement = arr => arr[this.Number(arr.length)]
  static Chance = (percents = 50) => this.Number() > percents
  static Octave = (min = 1, max = 6) => this.Number(min, max)
  static Note = (arr = NOTES) => this.ArrayElement(arr)
  static NoteAndOctave = (arr = NOTES) => `${this.ArrayElement(arr)}${this.Octave()}`
  static TuningName = (arr = Object.keys(TUNINGS)) => this.ArrayElement(arr)
  static ScaleName = (arr = SCALES) => this.ArrayElement(arr)
  static DurationSymbol = (arr = DURATION_SYMBOLS) => this.ArrayElement(arr)
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  static DurationAbsolute = () => this.Range({ min: 0.001, max: 1000 }).toFixed(2)
  static InstrumentName = (arr = INSTRUMENT_NAMES) => this.ArrayElement(arr)
  static SynthName = (arr = SYNTH_NAMES) => this.ArrayElement(arr)
  static SampleName = (arr = Object.keys(SAMPLE_NAMES)) => this.ArrayElement(arr)
  static SampleNoteNames = obj => Object.keys(obj)
  static Sorting = arr => arr.sort(() => this.Range() - 0.5)
  static Phrase = (notes = NOTES, phraseLength = 4) =>
    notes.length && this.Values(phraseLength).map(() => this.ArrayElement(notes))
  static PhrasesArray = (notes = NOTES, phraseLength = 4) =>
    notes && [...new Set([...this.Values().map(() => this.Phrase(notes, phraseLength))])]
}
class Validate {
  static check = schema => Joi.isSchema(schema) && schema.validate(schema)
  static Boolean = v => this.check(Joi.boolean(v))
  static True = v => v === true
  static Truthy = v => v ?? false
  static String = v => this.check(Joi.string(v))
  static Array = v => this.check(Joi.string(v))
  static Object = v => this.check(Joi.string(v))
  static Range = v => v > 0.0001 && v < 0.9999
  static Number = v => v > 0
  static PowerOfTwo = v => v % 2 === 0
  static Chance = v => v > 0 && v < 100
  static Octave = v => v > 0
  // static Note = v => CONSTANTS.NOTES.includes(v)
  static Note = v => this.check(Joi.string(v).pattern(/^[a-g#]+$/i))
  static NoteAndOctave = v => this.check(Joi.string(v).pattern(/^[a-g#]+[0-9]$/i))
  static NotesArray = v => this.check(Joi.array(v).items(this.Note))
  static TuningName = v => Object.keys(TUNINGS).includes(v)
  static ScaleName = v => SCALES.includes(v)
  // static DurationSymbol = v => DURATION_SYMBOLS.includes(v)
  static DurationSymbol = v => this.check(Joi.string(v).pattern(/^[ntms]$/i))
  static DurationRelative = v => this.check(Joi.string(v).pattern(/^1|2|4|8|16|32|64[nmts]$/i))
  static DurationAbsolute = v => v > 0 && v < 9999
  static InstrumentName = v => INSTRUMENT_NAMES.includes(v)
  static SynthName = v => SYNTH_NAMES.includes(v)
  static SampleName = v => SAMPLE_NAMES.includes(v)
  static SampleNoteNames = v => this.check(Joi.array(v).items(this.Note))
  static Phrase = v => this.NotesArray(v)
  static PhrasesArray = v => this.check(Joi.array(v).items(this.NotesArray))
}

module.exports = {
  Matchers,
  Random,
  Validate,
  CONSTANTS: {
    NOTES,
    SCALES,
    SCALES_SHORT,
    TUNINGS,
    INSTRUMENT_NAMES,
    SYNTH_NAMES,
    SAMPLE_NAMES,
    DURATION_SYMBOLS
  }
}
