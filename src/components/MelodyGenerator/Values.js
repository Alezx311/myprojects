const Teoria = require('teoria')
const Joi = require('joi')

//! class Random is generate functions, for easy work, test, processing, etc...
class Random {
  //* generate random range -> range > 0.01 && range < 0.99
  static Range = () => +(0.5 + Math.random() / 5).toFixed(2)
  //* generate random number -> number > min && number < max
  static Number = (min = 1, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min
  //* generate random power of 2 number -> 2,4,8,16,32,64...
  static PowerOfTwo = (maxPower = 5) => 2 ** this.Number(1, maxPower)
  //* generate random array with given length
  static Array = (arrayLength = 10) => Array(arrayLength).fill(1)
  //* generate random array with given length and random range values
  static Values = (arrayLength = 10) => this.Array(arrayLength).map(this.Range)
  //* get random element from given array
  static ArrayElement = (arr = ['invalid array']) => [...arr, ...arr][this.Number(0, arr.length)]
  //* shuffle given array
  static ArrayShuffle = (arr = []) => [...new Set([...arr, ...arr, ...arr].sort((a, b) => Math.random() - 0.5))]
  //* get random note char like: 'c', 'd#', 'bb' with possible '#' and 'b' symbols
  static NoteChar = (notesArray = NOTES) => this.ArrayElement(notesArray).toUpperCase()
  //* get random octave in given range (min is 1 and max is 6 for default)
  static Octave = (min = 1, max = 6) => this.Number(min, max)
  //* get random note char and join it with octave like: 'c2', 'd3', 'bb5'...
  static NoteCharAndOctave = (noteChar = NOTES, minOctave = 2) =>
    `${this.ArrayElement(noteChar)}${this.Octave(minOctave, minOctave + 1)}`
  //* get random guitar tuning name
  static TuningName = () => this.ArrayElement(TUNING_NAMES)
  //* get random musical scale name
  static ScaleName = () => this.ArrayElement(SCALES)
  //* get random music note duration symbol
  static DurationSymbol = () => this.ArrayElement(DURATION_SYMBOLS)
  //* get random music note duration value and symbol. for example, '1n' is full note, '4n' is fourth
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  //* get array with durations
  static DurationRelativesArray = (arrayLength = 10) => this.Array(arrayLength).map(v => this.DurationRelative())
  //* get absolute duration value. 1 is one second, for example
  static DurationAbsolute = () => this.Range()
  //* get array with absolute durations
  static DurationAbsolutesArray = (arrayLength = 10) => this.Array(arrayLength).map(v => this.DurationAbsolute())
  //* get random instrument name, like: 'cello', 'violin', ...
  static InstrumentName = () => this.ArrayElement(INSTRUMENT_NAMES)
  //* get random synth name, like: 'polysynth', 'fmsynth', ...
  static SynthName = () => this.ArrayElement(SYNTH_NAMES)
  //* get random sample name, match with instrument name, but can be changed in future
  static SampleName = () => this.ArrayElement(SAMPLE_NAMES)
  //* get possible note samples for random sample instrument
  static SampleNoteNames = () => Object.keys(SAMPLES[this.SampleName()])
  //* Random Bpm, in given range
  static Bpm = (min = 60, max = 120) => this.Number(min, max)
  //* Random Color, from given array, or HEX note colors
  static Color = (colorsArray = COLORS) => this.ArrayElement(colorsArray)
  //* Random Size, in given range, as square side length
  static Size = (min = 1, max = 100) => this.Number(min, max)
  //* Random Position, in given range, as { x, y}
  static Position = (min = 0, max = 100) => ({ x: this.Number(min, max), y: this.Number(min, max) })
  //* Random Velocity, in given range
  static Velocity = (min = 0.5) => 1 - (Math.random() * min).toFixed(2)
  //* Random Note Object with all values for play sound. Generated from given values
  static NoteObject = (notesArray = NOTES, minOctave = 2) => {
    const noteChar = this.NoteChar(notesArray)
    const octave = this.Octave(minOctave, minOctave + 2)
    const noteAndOctave = `${noteChar}${octave}`
    const duration = this.DurationRelative()
    const velocity = this.Velocity()
    const color = NOTE_COLORS[noteChar]

    return { noteChar, octave, noteAndOctave, duration, velocity, color }
  }
  //* Phrases
  static Phrases = (noteChar, scaleName, minOctave = 2, phrasesLength = 20) => {
    if (!noteChar || !SCALES.includes(scaleName)) {
      throw new Error({
        message: 'Invalid values to generate Phrases',
        data: { noteChar, scaleName, minOctave, phrasesLength }
      })
    }

    const { Note, Scale, Chord, Intervals, Info } = Helpers.NoteValues(noteChar, scaleName)

    const chordNotes = Chord.notes().toString()
    const scaleNotes = Scale.simple()
    const intervalScaleNotes = Intervals.scale.arpeggio
    const intervalStepsNotes = Intervals.steps.arpeggio

    const fromChordNotes = this.Array(phrasesLength).map(v => this.NoteObject(chordNotes, minOctave))
    const fromScaleNotes = this.Array(phrasesLength).map(v => this.NoteObject(scaleNotes, minOctave))
    const fromIntervalsScale = this.Array(phrasesLength).map(v => this.NoteObject(intervalScaleNotes, minOctave))
    const fromIntervalsSteps = this.Array(phrasesLength).map(v => this.NoteObject(intervalStepsNotes, minOctave))

    const fromMerging = Helpers.ArrayMerge(fromChordNotes, fromScaleNotes, fromIntervalsScale, fromIntervalsSteps)

    const randomElement = this.ArrayElement(fromMerging)

    const generateInfo = `Random Element Check fromMerging:

Length: ${fromMerging.length}
fromMerging randomElement.noteChar: ${randomElement.noteChar}
fromMerging randomElement.octave: ${randomElement.octave}
fromMerging randomElement.noteAndOctave: ${randomElement.noteAndOctave}
fromMerging randomElement.duration: ${randomElement.duration}
fromMerging randomElement.velocity: ${randomElement.velocity}
fromMerging randomElement.color: ${randomElement.color}

fromChordNotes randomElement:\n${Object.entries(fromChordNotes[1]).join('\n')}\n
fromScaleNotes randomElement:\n${Object.entries(fromScaleNotes[1]).join('\n')}\n
fromIntervalsScale randomElement:\n${Object.entries(fromIntervalsScale[1]).join('\n')}\n
fromIntervalsSteps randomElement:\n${Object.entries(fromIntervalsSteps[1]).join('\n')}\n`

    return {
      fromChordNotes,
      fromScaleNotes,
      fromIntervalsScale,
      fromIntervalsSteps,
      fromMerging,
      Note,
      Info,
      generateInfo
    }
  }
  //* BassMelody
  // static BassMelody = (noteChar, scaleName, minOctave) => {}
  //* DrumMelody
  // static DrumMelody = (noteChar, scaleName, minOctave) => {}
  //* LeadMelody
  // static LeadMelody = (noteChar, scaleName, minOctave) => {}
  //* GuitarPhrases
  // static GuitarPhrases = (fretNotesArray, phrasesDuration) => {}
}
//! Helpers is class with very useful methods, for easy use in any place
class Helpers {
  //* ArrayUnicals
  static ArrayUnicals = arr => [...new Set([...arr])]
  //* ArrayMerge
  static ArrayMerge = (arr, ...rest) => [...new Set([...arr, ...rest.flat()])]
  //* NoteToColor
  static NoteToColor = str => NOTE_COLORS?.[str] ?? false
  //* ColorToNote
  static ColorToNote = str => Object.entries(NOTE_COLORS).find(([key, value]) => value === str)?.[0] ?? false
  //* SomeArrayElementDouble
  static SomeArrayElementDouble = array => {
    const elementIndex = Random.Number(0, array.length)
    const doubled = [array[elementIndex], array[elementIndex]]
    array[elementIndex] = doubled

    return array
  }
  //* SomeArrayElementChange
  static SomeArrayElementChange = array => {
    array[Random.Number(0, array.length)] = array[Random.Number(0, array.length)]

    return array
  }
  //* SplitNoteAndOctave
  static SplitNoteAndOctave = str => {
    const noteChar = str.match(/^[a-g#]+/i)?.[0] ?? false
    const octave = str.match(/[1-6]$/i)?.[0] ?? false

    return { noteChar, octave }
  }
  //* ScaleNotes
  static ScaleNotes = (noteChar, scaleName) => Teoria.note(noteChar).scale(scaleName).simple()
  //* ChordNotes
  static ChordNotes = noteChar => Teoria.note(noteChar).chord().notes().toString().split(',')
  //* IntervalNotes
  static IntervalNotes = (noteChar, step) => Teoria.note(noteChar).interval(step).chord().notes().toString().split(',')
  //* NoteValues
  static NoteValues = (noteChar, scaleName) => {
    const Note = Teoria.note(noteChar)
    const Scale = Note.scale(scaleName)
    const Chord = Note.chord()
    const Interval = Note.interval(Teoria.note('a'))

    const Intervals = {
      scale: Scale.scale.map(v => Note.interval(v).chord().notes().toString().split(',')),
      steps: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'].map(v => Note.interval(v).chord().notes().toString().split(','))
    }

    const Info = `Note from Note: ${scaleName}
Note: ${Note.toString()}
Note.octave: ${Note.octave()}
Note.duration: ${Note.duration.toString()}
Note.accidental: ${Note.accidental()}
Note.accidentalValue: ${Note.accidentalValue()}
Note.key: ${Note.key()}
Note.midi: ${Note.midi()}
Note.fq: ${Note.fq()}
Note.chroma: ${Note.chroma()}
Note.interval1: ${Note.interval('P1').chord().notes().toString()}
Note.interval2: ${Note.interval('M2').chord().notes().toString()}
Note.interval3: ${Note.interval('M3').chord().notes().toString()}
Note.interval4: ${Note.interval('P4').chord().notes().toString()}
Note.interval5: ${Note.interval('P5').chord().notes().toString()}
Note.interval6: ${Note.interval('M6').chord().notes().toString()}
Note.interval7: ${Note.interval('M7').chord().notes().toString()}
Note.chord: ${Note.chord().notes().toString()}
Note.helmholtz: ${Note.helmholtz()}
Note.scientific: ${Note.scientific()}
Note.enharmonics: ${Note.enharmonics()}
Note.durationInSeconds: ${Note.durationInSeconds()}
Note.durationName: ${Note.durationName()}
Note.scaleDegree: ${Note.scaleDegree(Note.scale(scaleName))}
Note.solfege: ${Note.solfege(Note.scale(scaleName))}
Note.toString: ${Note.toString()}

Scale from Note: ${scaleName} and Scale: ${scaleName}:
Scale:  ${Scale.simple().toString()}
Scale.name:  ${Scale.name.toString()}
Scale.tonic:  ${Scale.tonic.toString()}
Scale.notes:  ${Scale.notes().toString()}
Scale.simple:  ${Scale.simple().toString()}
Scale.type:  ${Scale.type().toString()}

Chord from Note: ${noteChar}
Chord: ${Chord.toString()}
Chord.root: ${Chord.root.toString()}
Chord.name: ${Chord.name}
Chord.notes: ${Chord.notes().toString()}
Chord.simple: ${Chord.simple()}
Chord.bass: ${Chord.bass().toString()}
Chord.voicing: ${Chord.voicing().toString()}
Chord.get: ${Chord.get('third').toString()}
Chord.quality: ${Chord.quality()}
Chord.dominant: ${Chord.dominant().toString()}
Chord.subdominant: ${Chord.subdominant().toString()}
Chord.parallel: ${Chord.parallel().toString()}
Chord.interval: ${Chord.interval('P5').toString()}
Chord.chordType: ${Chord.chordType()}
Chord.toString: ${Chord.toString()}

Interval from Note: ${noteChar} and Scale: ${scaleName}:
Interval: ${Interval.toString()}
Interval.coord: ${Interval.coord.toString()}
Interval.number: ${Interval.number().toString()}
Interval.value: ${Interval.value().toString()}
Interval.base: ${Interval.base().toString()}
Interval.type: ${Interval.type().toString()}
Interval.quality: ${Interval.quality().toString()}
Interval.qualityValue: ${Interval.qualityValue().toString()}
Interval.direction: ${Interval.direction().toString()}
Interval.semitones: ${Interval.semitones().toString()}
Interval.simple: ${Interval.simple().toString()}
Interval.octaves: ${Interval.octaves().toString()}
Interval.isCompound: ${Interval.isCompound().toString()}`

    return { Note, Scale, Chord, Interval, Intervals, Info }
  }
  //* ObjStat}
  static ObjStat = obj => {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const entries = Object.entries(obj)

    return `Object: ${obj}\nKeys: ${keys.length}\nValues: ${values.length}\nEntries: ${entries.length}`
  }
}
//! Validators for fast check values
class Validate {
  static isValid = result => !result.error && result.value && true
  static Boolean = v => this.isValid(Joi.boolean().validate(v))
  static String = v => this.isValid(Joi.string().validate(v))
  static Array = v => this.isValid(Joi.array().validate(v))
  static Object = v => this.isValid(Joi.object().validate(v))
  static Range = v => this.isValid(Joi.number().min(0.01).max(0.99).validate(v))
  static Number = v => this.isValid(Joi.number().min(1).max(100).validate(v))
  static PowerOfTwo = v => this.isValid(Joi.number().min(1).max(64).validate(v))
  static Octave = v => this.isValid(Joi.number().min(1).max(6).validate(v))
  static NoteChar = v =>
    this.isValid(
      Joi.string()
        .min(1)
        .max(2)
        .pattern(/^[a-g#]+$/i)
        .validate(v)
    )
  static NoteCharAndOctave = v =>
    this.isValid(
      Joi.string()
        .min(2)
        .max(3)
        .pattern(/^[a-g#]+[1-6]$/i)
        .validate(v)
    )
  static NotesArray = v => this.isValid(Joi.array().items(this.NoteChar).validate(v))
  static DurationSymbol = v =>
    this.isValid(
      Joi.string()
        .pattern(/^[ntms]$/i)
        .validate(v)
    )
  static DurationRelative = v =>
    this.isValid(
      Joi.string()
        .pattern(/^1|2|4|8|16|32|64[nmts]$/i)
        .validate(v)
    )
  static DurationAbsolute = v => this.isValid(Joi.number().min(0.001).max(10000).validate(v))
}
//! Matchers for easy extract values from strings
class Matchers {
  static noteChar = str => new RegExp('^[a-g#]+', 'i').exec(str).join()
  static octave = str => new RegExp('\\d$', 'i').exec(str).join()
  static durationValue = str => new RegExp('^\\d+', 'i').exec(str).join()
  static durationSymbol = str => new RegExp('[ntms]$', 'i').exec(str).join()
}
//! Constant Values for using in generate values, validate, etc...
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
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
  'contrabass',
  'guitar-acoustic',
  'guitar-electric',
  'guitar-nylon',
  'organ',
  'piano',
  'saxophone',
  'violin'
]
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
const SAMPLE_NAMES = INSTRUMENT_NAMES
const DURATION_SYMBOLS = ['n', 't', 'm', 'n']
const NOTE_COLORS = {
  A: '#00ff00',
  'A#': '#8000ff',
  AB: '#8000ff',
  B: '#00ffff',
  'B#': '#ff80c0',
  BB: '#ff80c0',
  C: '#ff0000',
  D: '#ffff00',
  'D#': '#ff00ff',
  DB: '#ff00ff',
  E: '#0080c0',
  'E#': '#808080',
  EB: '#808080',
  F: '#800000',
  G: '#ff8000',
  'G#': '#8080c0',
  GB: '#8080c0'
}
const SAMPLES = {
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
  }
}
const TUNING_NAMES = Object.keys(TUNINGS)
const COLORS = Object.values(NOTE_COLORS)

module.exports = {
  Random,
  Helpers,
  Validate,
  Matchers,
  NOTES,
  SCALES,
  TUNINGS,
  TUNING_NAMES,
  INSTRUMENT_NAMES,
  SYNTH_NAMES,
  SAMPLES,
  SAMPLE_NAMES,
  DURATION_SYMBOLS,
  NOTE_COLORS,
  COLORS
}
