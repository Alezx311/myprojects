const NOTE_COLORS = {
  A: '#00ff00',
  Ab: '#8000ff',
  B: '#00ffff',
  Bb: '#ff80c0',
  C: '#ff0000',
  D: '#ffff00',
  Db: '#ff00ff',
  E: '#0080c0',
  Eb: '#808080',
  F: '#800000',
  G: '#ff8000',
  Gb: '#8080c0'
}
const COLORS = Object.values(NOTE_COLORS)

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
  static NoteChar = (notesArray = NOTES) => this.ArrayElement(notesArray)
  //* get random octave in given range (min is 1 and max is 6 for default)
  static Octave = (minOctave = 1, maxOctave = 6) => this.Number(minOctave, maxOctave)
  //* get random note char and join it with octave like: 'c2', 'd3', 'bb5'...
  static NoteCharAndOctave = (chars = NOTES, maxOctave = 6) => `${this.ArrayElement(chars)}${this.Octave(maxOctave)}`
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
  static Velocity = (min = 0.5) => min + (Math.random() / 3).toFixed(2)
  //* Random NoteObject, from given values.
  // @param noteChar -> music note character ('a', 'c#', ...)
  // @param octave -> music octave (3, 2, ...)
  // @param noteAndOctave -> joined, for easy sound synthesis ('a3', 'c#2', ...)
  // @param duration -> music note duration, in relative ('4n', '3n', ...)
  // @param velocity -> music note character (0.7, 0.67, ...)
  static NoteObject = (notesArray = NOTES, minOctave = 2) => {
    const noteChar = this.NoteChar(notesArray)
    const octave = this.Octave(1, minOctave)
    const noteAndOctave = `${noteChar}${octave}`
    const duration = this.DurationRelative()
    const velocity = this.Velocity()

    return { noteChar, octave, noteAndOctave, duration, velocity }
  }
  //TODO randomPhrases
  static Phrases = (tonicalNote, scaleName, minOctave) => {
    const { Note, Scale, Intervals } = Helpers.NoteValues({ tonicalNote, scaleName, minOctave })
    const phrases = this.Array(100).map(v => this.ArrayShuffle(v))
  }
  //TODO randomBassMelody
  static BassMelody = (tonicalNote, scaleName, minOctave) => {
    const { Note, Scale, Intervals } = Helpers.NoteValues({ tonicalNote, scaleName, minOctave })
    const phrases = this.Array(100).map(v => this.ArrayShuffle(v))
  }
  //TODO randomDrumMelody
  static DrumMelody = (tonicalNote, scaleName, minOctave) => {
    const { Note, Scale, Intervals } = Helpers.NoteValues({ tonicalNote, scaleName, minOctave })
    const phrases = this.Array(100).map(v => this.ArrayShuffle(v))
  }
  //TODO randomLeadMelody
  static LeadMelody = (tonicalNote, scaleName, minOctave) => {
    const { Note, Scale, Intervals } = Helpers.NoteValues({ tonicalNote, scaleName, minOctave })
    const phrases = this.Array(100).map(v => this.ArrayShuffle(v))
  }
  //TODO randomGuitarPhrases
  static GuitarPhrases = (fretNotesArray, phrasesDuration) => {
    const phrases = Array(100)
      .fill(fretNotesArray, phrasesDuration)
      .map(v => this.ArrayShuffle(v))
  }
}
class Helpers {

}

const getArray = (arrayLength = 10) => Array(arrayLength).fill(1)

describe('Helpers', () => {
  //TODO someArrayElementDouble
  //TODO someArrayElementChange
  //TODO splitNoteAndOctave
  //TODO objStat
  //TODO getInstrument
  //TODO getTrack
  //TODO getTransport
})

describe('Random', () => {
  it('Random Range -> ()', () => {
    const resultsArray = getArray().map(Random.Range)

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeDefined()
      expect(v).toBeGreaterThanOrEqual(0.01)
      expect(v).toBeLessThanOrEqual(0.99)
    })
  })
  it('Random Number -> ()', () => {
    const resultsArray = getArray().map(v => Random.Number(1, 100))
    const resultsArrayGreater = getArray().map(v => Random.Number(100, 1000))

    expect(resultsArray).toHaveLength(10)
    expect(resultsArrayGreater).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeDefined()
      expect(v).toBeGreaterThanOrEqual(1)
      expect(v).toBeLessThanOrEqual(100)
    })
    resultsArrayGreater.forEach(v => {
      expect(v).toBeDefined()
      expect(v).toBeGreaterThanOrEqual(100)
      expect(v).toBeLessThanOrEqual(1000)
    })
  })
  it('Random Array ->', () => {
    const resultsArray = Random.Array()
    const resultsArrayGreater = Random.Array(234)

    expect(resultsArray).toHaveLength(10)
    expect(resultsArrayGreater).toHaveLength(234)
  })
  it('Random Values ->', () => {
    const resultsArray = Random.Values(10)

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeDefined()
      expect(v).toBeGreaterThanOrEqual(0.01)
      expect(v).toBeLessThanOrEqual(0.99)
    })
  })
  it('Random ArrayElement ->', () => {
    const input = ['some', 'another', 'more']

    const result1 = Random.ArrayElement(input)
    const result2 = Random.ArrayElement(input)
    const result3 = Random.ArrayElement(input)
    const merged = [...new Set([...input, result1, result2, result3])]

    expect(merged).toStrictEqual(input)
    expect(input).toContain(result1)
    expect(input).toContain(result2)
    expect(input).toContain(result3)
  })
  it('Random ArrayShuffle ->', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const result = Random.ArrayShuffle(input)

    const compared = result.map((v, i) => input[i] === v)

    expect(compared).toContain(false)
  })
  it('Random NoteChar ->', () => {
    const resultsArray = getArray().map(v => Random.NoteChar())

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v.length).toBeDefined()
      expect(v.length).toBeGreaterThanOrEqual(1)
      expect(v.length).toBeLessThanOrEqual(2)
      expect(v).toMatch(/^[a-g#]+$/i)
    })
  })
  it('Random Octave ->', () => {
    const resultsArray = getArray().map(v => Random.Octave())

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeGreaterThanOrEqual(1)
      expect(v).toBeLessThanOrEqual(6)
    })
  })
  it('Random NoteCharAndOctave ->', () => {
    const resultsArray = getArray().map(v => Random.NoteCharAndOctave())

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v.length).toBeDefined()
      expect(v.length).toBeGreaterThanOrEqual(2)
      expect(v.length).toBeLessThanOrEqual(3)
      expect(v).toMatch(/^[a-g#]/i)
      expect(v).toMatch(/[1-6]$/i)
    })
  })
  it('Random TuningName ->', () => {
    const resultsArray = getArray().map(v => Random.TuningName())
    const TUNINGS = ['E Standart', 'Drop D', 'Drop C', 'Drop B']

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(TUNINGS).toContain(v)
    })
  })
  it('Random ScaleName ->', () => {
    const resultsArray = getArray().map(v => Random.ScaleName())
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

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(SCALES).toContain(v)
    })
  })
  it('Random DurationSymbol ->', () => {
    const resultsArray = getArray().map(v => Random.DurationSymbol())
    const DURATION_SYMBOLS = ['n', 't', 'm', 'n']

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(DURATION_SYMBOLS).toContain(v)
    })
  })
  it('Random DurationRelative ->', () => {
    const resultsArray = getArray().map(v => Random.DurationRelative())

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v.length).toBeDefined()
      expect(v.length).toBeLessThanOrEqual(3)
      expect(v.match(/^\d+/i) % 2).toBe(0)
      expect(v).toMatch(/^\d?\d[ntms]$/i)
    })
  })
  it('Random DurationAbsolute ->', () => {
    const resultsArray = getArray().map(v => Random.DurationAbsolute())

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(10000)
    })
  })
  it('Random DurationAbsolutesArray ->', () => {
    const resultsArray = Random.DurationAbsolutesArray()

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(10000)
    })
  })
  it('Random InstrumentName ->', () => {
    const resultsArray = getArray().map(v => Random.InstrumentName())
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

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(INSTRUMENT_NAMES).toContain(v)
    })
  })
  it('Random SynthName ->', () => {
    const resultsArray = getArray().map(v => Random.SynthName())
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

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(SYNTH_NAMES).toContain(v)
    })
  })
  it('Random SampleName ->', () => {
    const resultsArray = getArray().map(v => Random.SampleName())
    const SAMPLE_NAMES = [
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

    expect(resultsArray).toHaveLength(10)

    resultsArray.forEach(v => {
      expect(SAMPLE_NAMES).toContain(v)
    })
  })
})

// Notes Symbols
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
// Scale Names
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
// Scale Names Shorted
const SCALES_SHORT = ['major', 'minor', 'majorpentatonic', 'minorpentatonic', 'blues', 'harmonicminor', 'melodicminor']
// Guitar Tunings -> Object{name: openStringNote}
const TUNINGS = {
  'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
  'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
}
const TUNING_NAMES = Object.keys(TUNINGS)
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
const SAMPLE_NAMES = INSTRUMENT_NAMES
const DURATION_SYMBOLS = ['n', 't', 'm', 'n']
