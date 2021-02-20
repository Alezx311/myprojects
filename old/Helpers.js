import * as Teoria from 'teoria'
import { Joi } from 'joi'
import CONSTANTS from './constants'
import TS from 'total-serialism'

export class Serializm {
  // const Rhythm
  // const flow
}

const {
  NOTE_CHARS,
  DURATION_CHARS,
  INTERVAL_CHARS,
  SCALES,
  TUNINGS,
  TUNING_NAMES,
  INSTRUMENT_NAMES,
  SYNTH_NAMES,
  COLORS,
  PROPS
} = CONSTANTS

export class Constants {
  static NOTE_CHARS = NOTE_CHARS
  static DURATION_CHARS = DURATION_CHARS
  static INTERVAL_CHARS = INTERVAL_CHARS
  static SCALES = SCALES
  static TUNINGS = TUNINGS
  static TUNING_NAMES = TUNING_NAMES
  static INSTRUMENT_NAMES = INSTRUMENT_NAMES
  static SYNTH_NAMES = SYNTH_NAMES
  static COLORS = COLORS
  static PROPS = PROPS
}

Array.Prototype.reset = (arr = this.ARRAY, value = 1) => {
  arr.length = 1
  console.log('Array resetted', arr)

  return this.ARRAY
}
Array.Prototype.fill = (arr = this.ARRAY, value = 'fill value') => {
  this.ARRAY.map(v => value)
  console.log('Array filled', arr)

  return this.ARRAY
}

//! class Random is generate functions, for easy work, test, processing, etc...
export class Random {
  //? Values for generate
  static MIN = 1
  static MAX = 1000000
  static MAX_POWER = 5
  static ARRAY_VALUE = 1
  static SIZE = 25
  static RANGE = this.Range()
  static ARRAY = Array(this.SIZE)
    .fill(this.ARRAY_VALUE)
    .map(() => this.NoteChar(this.CHARS))
  static CHARS = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  static DATE_STAMP = () => new Date(Date.now()).toISOString()
  static TIME_STAMP = () => new Date(Date.now()).toLocaleTimeString()

  static options = {
    min: 1,
    max: 1000000,
    maxPower: 5,
    value: 1,
    chars: 'QWERTYUIOPASDFGHJKLZXCVBNM'.split(''),
    noteChars: 'ABCDEFG'.split(''),
    values: Array(100)
      .fill(1)
      .map(v => this.Number()),
    arraySize: 25,
    repeats: 5,
    reactKeyLength: 25,
    bpmMin: 50,
    bpmMax: 250,
    colors: COLORS,
    chance: 10,
    key: 'C',
    scale: 'minor',
    size: 25,
    timestamp: this.TIME_STAMP(),
    datestamp: this.DATE_STAMP(),
    updatedAt: this.DATE_STAMP(),
    lastUpdate: {}
  }

  static mergeOptions = custom => Object.assign(this.OPTIONS, custom, { lastUpdate: custom })
  // static mergeOptions = custom => ({ ...this.OPTIONS, ...custom})

  //* generate random range -> range > 0.01 && range < 0.99
  static Range = () => Math.random().toFixed(2)
  static SortFunc = () => this.Range() - 0.5
  //* generate random number -> number > min && number < max
  static Number = (min = this.options.min, max = this.options.max) => Math.floor(this.Range() * (max - min + 1)) + min
  static NumbersArray = (size = 4, min = this.options.min, max = this.options.max) =>
    this.Array(size).map(() => this.Number())
  //* generate random power of 2 number -> 2,4,8,16,32,64...
  static PowerOfTwo = (maxPower = this.options.maxPower) => 2 ** this.Number(1, maxPower)
  //* generate random array with given length
  static Array = (arraySize = this.options.arraySize, value = this.options.value) => Array(arraySize).fill(value)
  //* generate random array with given length and random range values
  static Values = (arraySize = this.options.arraySize, values = this.options.values) =>
    this.Array(arraySize).map(v => this.ArrayElement(values))
  //* Random Char
  static Char = (chars = this.options.chars) => this.ArrayElement(chars)
  //* Random Chars Array, like Values, but for symbols
  static Chars = (arraySize = this.options.arraySize, chars = this.options.chars) => this.Values(arraySize, chars)
  //* Random ReactKey
  static ReactKey = (reactKeyLength = this.options.reactKeyLength) => `KEY${this.Chars(reactKeyLength).join('')}`
  //* get random element from given array
  static ArrayElement = (array, { length } = array) => length > 1 && array[this.Number(0, length)]
  //* shuffle given array
  static ArrayUnicals = (array, { length } = array) => length > 1 && [...new Set([...array])]
  static ArrayMultiply = (array, repeats = 5) => this.Values(repeats, array).reduce(acc => [...acc, ...array], array)
  static ArrayShuffle = (array, { length } = array) =>
    length > 1 && this.ArrayUnicals(this.ArrayMultiply(array)).sort(this.SortFunc)
  //* get random note char like: 'c', 'd#', 'bb' with possible '#' and 'b' symbols
  static NoteChar = (noteChars = this.options.noteChars) => this.ArrayElement(noteChars)
  //* get random octave in given range (min is 1 and max is 6 for default)
  static Octave = () => this.Number(1, 6)
  //* get random note char and join it with octave like: 'c2', 'd3', 'bb5'...
  static NoteCharAndOctave = (noteChars = this.options.noteChars) => `${this.ArrayElement(noteChars)}${this.Octave()}`
  //* get random guitar tuning name
  static TuningName = () => this.ArrayElement(TUNING_NAMES)
  //* get random guitar tuning values
  static Tuning = () => TUNINGS[this.TuningName()]
  //* get random musical scale name
  static ScaleName = () => this.ArrayElement(SCALES)
  //* get random music note duration symbol
  static DurationSymbol = () => this.ArrayElement(DURATION_CHARS)
  //* get random music note duration value and symbol. for example, '1n' is full note, '4n' is fourth
  static DurationRelative = () => `${this.PowerOfTwo()}${this.DurationSymbol()}`
  //* get absolute duration value. 1 is one second, for example
  static DurationAbsolute = () => this.Range()
  //* get random instrument name, like: 'cello', 'violin', ...
  static InstrumentName = () => this.ArrayElement(INSTRUMENT_NAMES)
  //* get random synth name, like: 'polysynth', 'fmsynth', ...
  static SynthName = () => this.ArrayElement(SYNTH_NAMES)
  //* Random Bpm, in given range
  static Bpm = (bpmMin = this.options.bpmMin, bpmMax = this.options.bpmMax) => this.Number(bpmMin, bpmMax)
  //* Random Color, from given array, or HEX note colors
  static Color = (colors = this.options.colors) => this.ArrayElement(colors)
  //* Random Velocity, in given range
  static Velocity = (min = 0.5) => 1 - (Math.random() * min).toFixed(2)
  //* Random Note Object with all values for play sound. Generated from given values
  static NoteObject = (notesArray = NOTE_CHARS, minOctave = 2) => {
    const noteChar = this.NoteChar(notesArray)
    const octave = this.Octave(minOctave, minOctave + 2)
    const noteAndOctave = `${noteChar}${octave}`
    const duration = this.DurationRelative()
    const velocity = this.Velocity()
    const color = COLORS[noteChar]

    return { noteChar, octave, noteAndOctave, duration, velocity, color }
  }
  //* Change some given array elements for random array element with given chance
  static ArrayChangeSome = array => array.map(v => (this.Number() > this.options.chance ? this.ArrayElement(array) : v))
  static RhythmNumbers = (size = 4) => this.Numbers(size, 0, 5).map(num => (num > 1 ? this.Numbers(size, 0, 5) : num))
  static RhythmNotes = (size = 4) => {
    const rhytms = this.RhythmVariations(size)

    return this.ArrayElement(rhytms)
  }
  static Melody = args => {
    const { key, scale, size } = this.mergeOptions(args)
    const { Note, Scale, Chord, Intervals, Info } = Helpers.NoteValues(key, scale)
    const notesArray = this.ArrayMultiply(Scale.simple())
    const rhythmNumbers = this.Rhythm(size)
    const rhythmNotes = rhythmNumbers.map(num => notesArray[num])
  }
  //* Generate Music Phrases of note objects
  static Phrases = (noteChar, scaleName, minOctave = 2, phrasesLength = this.SIZE) => {
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
  //* Generate simple melody with note objects
  static SimpleMelody = (noteChar, scaleName, minOctave = 2, melodyLength = 16) => {
    const { Note, Scale, Chord, Intervals, Roots, Notes } = Helpers.TeoriaValues(noteChar, scaleName)
    const scaleNotes = Scale.simple()
    const chordNotes = Chord.notes().toString().split(',')

    const getPatternMelody = () => this.Array(melodyLength).map(v => this.NoteObject(scaleNotes, minOctave))
    const patternMelody = getPatternMelody()

    const getScaleMelody = () => patternMelody.map(v => this.NoteObject(scaleNotes, minOctave))
    const getChordsMelody = () => patternMelody.map(v => this.NoteObject(chordNotes, minOctave))
    const getRootsMelody = () => patternMelody.map(v => this.NoteObject(Roots, minOctave))
    const getIntervalsMelody = () => patternMelody.map(v => this.NoteObject(Notes, minOctave))

    const generate = (pattern = patternMelody, chance = this.Number()) => {
      const scale = this.ArrayChangeSome(getScaleMelody(), chance)
      const chords = this.ArrayChangeSome(getChordsMelody(), chance)
      const roots = this.ArrayChangeSome(getRootsMelody(), chance)
      const intervals = this.ArrayChangeSome(getIntervalsMelody(), chance)

      const merged = Helpers.ArrayMerge(pattern, scale, chords, roots, intervals)
      const flatted = this.ArrayChangeSome(merged, chance).flat('Infinite')

      return Helpers.ArrayMerge(pattern, scale, chords, roots, intervals, merged, flatted)
    }

    const simple = generate()

    console.log(`Simple Melody created.
    Length: ${simple.length}
    Unical Notes: ${this.ArrayUnicals(simple.map(v => v.noteAndOctave))}
    Interval Moves: ${simple.reduce(
      (acc, val, ind) => {
        const [diff1, diff2] = [ind, acc.ind].sort((a, b) => a - b)
        const step = Helpers.IntervalBetween(acc.noteChar, val.noteChar)
        const diff = diff1 - diff2
        const message = `Move interval: ${step}\nDifference: ${diff}\nAccumulator: ${acc}\nValue: ${val}`
        const move = { step, diff, message, ind, val }
        const state = { ...acc, ...move }

        console.log('step', step)
        console.log('diff', diff)
        console.log('message', message)
        console.log('move', move)
        console.log('state', state)

        return state
      },
      { step: '', ind: -1, noteChar: 'some...' }
    )}
    `)

    return simple
  }

  //TODO Generate Bass Instrument Melody, to match sound with exists melody
  // static BassMelody = (melody, bpm = 60) => {
  //   const melodyNotes = Helpers.ArrayUnicals(melody.reduce((a, v) => a.push(v.noteAndOctave), []))
  //   const phrases = Helpers.ArrayUnicals(this.Array(100).map(v => this.ArrayShuffle(melodyNotes)))

  //   console.log(melodyNotes)
  //   console.log(phrases)
  // }

  //TODO Generate Drum Instrument Melody, to match sound with exists melody
  // static DrumMelody = (melody, bpm = 60) => {
  //   const melodyNotes = Helpers.ArrayUnicals(melody.reduce((a, v) => a.push(v.noteAndOctave), []))
  //   const phrases = Helpers.ArrayUnicals(this.Array(100).map(v => this.ArrayShuffle(melodyNotes)))

  //   console.log(melodyNotes)
  //   console.log(phrases)
  // }

  //TODO Generate Lead Instrument Melody, to match sound with exists melody
  // static LeadMelody = (melody, bpm = 60) => {
  //   const melodyNotes = Helpers.ArrayUnicals(melody.reduce((a, v) => a.push(v.noteAndOctave), []))
  //   const phrases = Helpers.ArrayUnicals(this.Array(100).map(v => this.ArrayShuffle(melodyNotes)))

  //   console.log(melodyNotes)
  //   console.log(phrases)
  // }

  //TODO Generate Guitar Melody, to match sound with exists melody
  // static GuitarMelody = (melody = 2, bpm = 60) => {
  //   const melodyNotes = Helpers.ArrayUnicals(melody.reduce((a, v) => a.push(v.noteAndOctave), []))
  //   const phrases = Helpers.ArrayUnicals(this.Array(100).map(v => this.ArrayShuffle(melodyNotes)))

  //   console.log(melodyNotes)
  //   console.log(phrases)
  // }
}
//! Validators for fast check values
export class Validate {
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
export class Matchers {
  static noteChar = str => new RegExp('^[a-g#]+', 'i').exec(str).join()
  static octave = str => new RegExp('\\d$', 'i').exec(str).join()
  static durationValue = str => new RegExp('^\\d+', 'i').exec(str).join()
  static durationSymbol = str => new RegExp('[ntms]$', 'i').exec(str).join()
}
//! Helpers is class with very useful methods, for easy use in any place
export default class Helpers {
  static Random = Random
  static Validate = Validate
  static Matchers = Matchers
  static CONSTANTS = CONSTANTS
  //* Unical Array Elements
  static ArrayUnicals = arr => [...new Set([...arr])]
  //* Can work with any number of arrays, always return one merged array, with unical values of all given arrays
  static ArrayMerge = (arr, ...rest) => [...new Set([...arr, ...rest.flat()])]
  //* Convert Note Char to HEX Color
  static NoteToColor = str => COLORS?.[str] ?? false
  //* Convert HEX Color to Note Char
  static ColorToNote = str => Object.entries(COLORS).find(([key, value]) => value === str)?.[0] ?? false
  //* Doubled random array element, useful on melody generate. For example, [1,2,3] -> [1,[2,2],3]
  static SomeArrayElementDouble = array => {
    const elementIndex = Random.Number(0, array.length)
    const doubled = [array[elementIndex], array[elementIndex]]
    array[elementIndex] = doubled

    return array
  }
  //* Change random array element, useful on melody generate. For example, [1,2,3] -> [1,3,3]
  static SomeArrayElementChange = array => {
    array[Random.Number(0, array.length)] = array[Random.Number(0, array.length)]

    return array
  }
  //* Split Note And Octave from String, and return an object { noteChar, octave }
  static SplitNoteAndOctave = str => {
    const noteChar = str.match(/^[a-g#]+/i)?.[0] ?? false
    const octave = str.match(/[1-6]$/i)?.[0] ?? false

    return { noteChar, octave }
  }
  //* Getter for Teoria intervals for note and scale
  static TeoriaIntervals = (noteChar, scaleName) =>
    noteChar?.scale(scaleName).simple() ?? Teoria.note(noteChar).scale(scaleName)
  //* Getter for all Teoria values fro note and scale { note, scale, chord tonical and elements, all interval roots and elements}
  static TeoriaValues = (noteChar, scaleName) => {
    const Note = Teoria.note(noteChar)
    const Chord = Note.chord()
    const Scale = Note.scale(scaleName)
    const Intervals = Scale.scale
    const Roots = Intervals.map(v => Note.interval(v).chord().tonic())
    const Notes = Roots.map(v => Teoria.note(v).chord().notes().toString().split(','))

    return { Note, Scale, Chord, Intervals, Roots, Notes }
  }
  //* Return musical scale for any given note and valid scale name. ('C', 'blues') -> ['A', 'C#',...]
  static ScaleNotes = (noteChar, scaleName) => Teoria.note(noteChar).scale(scaleName).simple()
  //* Transform any note char or chord name to array of notes, which play in this chord
  static ChordNotes = noteChar => Teoria.note(noteChar).chord().notes().toString().split(',')
  //* Return next interval note, for any note char and interval value. Work with 'third' or 'second' interval names too
  static IntervalNotes = (noteChar, step) => Teoria.note(noteChar).interval(step).chord().notes().toString().split(',')
  //* Return many of Teoria.js data and methods about music note char and scale name.
  static NoteValues = (noteChar, scaleName) => {
    const Note = Teoria.note(noteChar)
    const Scale = Note.scale(scaleName)
    const Chord = Note.chord().notes().toString().split(',')
    const Interval = Note.interval(Teoria.note('a'))
    const Intervals = {
      scale: Scale.scale.map(v => this.ChordNotes(Note.interval(v))),
      steps: INTERVAL_CHARS.map(v => this.ChordNotes(Note.interval(v)))
    }

    return { Note, Scale, Chord, Interval, Intervals }
  }
  //* Multiply Array by given value. For Generate Long and unical phrases
  static ArrayExtend = (array = [1], times = 10) =>
    this.Array(times)
      .map(v => array.flat())
      .flat()
  //* Note step Interval chord notes
  static stepInterval = (noteChar, step) => Teoria.note(noteChar).interval(step).chord().notes().toString().split(',')
  //* Note Interval Notes in lot of variations
  static NoteIntervalNotes = noteChar => {
    const intervalNotes = INTERVAL_CHARS.map(step => this.stepInterval(noteChar, step)).join()
    const chordNotes = intervalNotes.map(this.ChordNotes)
    const chordPhrases = chordNotes.map(chordNotes => this.ArrayShuffle(chordNotes))
    const shuffled = chordPhrases.map(v => this.ArrayShuffle([...v, ...v, ...v, ...v, ...v]))

    const sources = { intervalNotes, chordNotes, chordPhrases, shuffled }
    const merged = this.ArrayMerge(intervalNotes, chordNotes, chordPhrases, shuffled)

    const short = merged.filter(v => v.length < 10)
    const long = merged.filter(v => v.length > 10)
    const onStart = merged.filter(v => v[0] === noteChar)
    const onEnd = merged.filter(v => v[v.length] === noteChar)
    const many = merged.filter(v => [...v].filter(char => char === noteChar).length > 1)
    const once = merged.filter(v => [...v].filter(char => char === noteChar).length === 1)

    const phrases = { short, long, onStart, onEnd, many, once }

    return { noteChar, sources, phrases, merged }
  }
  //* Return text message with given object statistics. For React, and strange bugs
  static ObjStat = obj => {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const entries = Object.entries(obj)

    return `Object: ${obj}\nKeys: ${keys.length}\nValues: ${values.length}\nEntries: ${entries.length}`
  }
}

//! Old Functions, for faq
//  const randNumber = (max = 6) => Math.ceil(Math.random() * max)

//  const randomArrayElement = array => array[Math.floor(Math.random() * array.length)]

//  const MusicHelpers = {
//  rand: {
//  note: () => {
//  const note = `${randomArrayElement(values.note)}${1 + Math.ceil(Math.random() * 8)}`
//  return { note, helper: Teoria.note(note) }
//  },
//  scale: () => {
//  const Note = Teoria.note(`${randomArrayElement(values.note)}${1 + Math.ceil(Math.random() * 8)}`)
//  return Note.scale(randomArrayElement(values.scale)).simple()
//  },
//  tuning: () => randomArrayElement(values.tuning),
//  duration: () => `${2 * Math.ceil(Math.random() * 5)}n`,
//  octave: () => 1 + Math.ceil(Math.random() * 5),
//     sequence: (size = [8, 12], key = 'C3', scale = 'minorpentatonic') => {
//       const Note = Teoria.note(key)
//       const Scale = Note.scale(scale).simple()

//       console.log(Note)
//       console.log(Scale)

//       console.log(size, key, scale)

//       const shortSeq = Array(size[0])
//         .fill(1)
//         .map(el => ({ note: `${randomArrayElement(Scale)}${randNumber(4)}`, duration: `${2 ** randNumber(5)}n` }))
//       const playable = Array(size[1]).fill(shortSeq)

//       console.log(playable)

//       return playable
//     }
//   },
//   getScale: (key, name) => Teoria.note(`${key}4`).scale(name),
//   getKey: (key, octave = this.rand.octave) => `${key}${octave}`
// }

// export const randomRange = () => Math.random()
// export const randomNumber = (max = 100, min = 0) => ~~(min + randomRange() * (max - min))
// export const randomPowerOfTwo = (max = 5) => 2 ** randomNumber(max, 2)
// export const randomArrayElement = arr => (arr.length ? arr[randomNumber(arr.length)] : null)
// export const randomBoolean = () => randomNumber() > 50
// export const randomArrayShuffle = arr => arr.sort((a, b) => (randomBoolean() ? 1 : -1))
// export const randomArrayElementChange = arr => {
//   const el = randomArrayElement(arr)
//   const ind = randomNumber(arr.length)
//   arr[ind] = el
//   return arr
// }
// export const randomArrayElementDoubled = arr => {
//   const { note, velocity } = randomArrayElement(arr) ?? { note: 'c2', duration: '4n' }
//   const ind = randomNumber(arr.length)
//   arr[ind] = [[{ note, velocity, duration: '16n' }], [{ note, velocity, duration: '16n' }]]
//   return arr
// }
// export const randomDurationSymbol = (durations = ['n', 't']) => randomArrayElement(durations)
// export const randomScale = () => randomArrayElement(SCALES)
// export const randomBpm = () => randomNumber(170, 130)
// export const randomDuration = () => `${randomPowerOfTwo(4)}${randomDurationSymbol()}`
// export const randomNote = (arr = NOTE_CHARS) => randomArrayElement(arr)
// export const randomNoteAndOctave = (arr = NOTE_CHARS, octave = 2) => `${randomArrayElement(arr)}${octave}`
// export const noteScale = (noteChar, scaleName) => {
//   if (!noteChar || !scaleName) {
//     throw new Error(`Invalid noteChar: ${noteChar} or scaleName: ${scaleName} at Helpers.noteScale()`)
//   }

//   const Note = Teoria.note(noteChar)
//   const Scale = Note.scale(scaleName).simple()

//   return { Note, Scale }
// }
// export const randomPatterns = (arr = NOTE_CHARS, len = 4) => {
//   const pattern = Array(len)
//     .fill(1)
//     .map(v => randomArrayElement(arr))
//   const patternsVariations = Array(len ** 2)
//     .fill(pattern)
//     .map(v => v.sort(() => Math.random() - 0.5))
//   const unicalsPatterns = [...new Set([...patternsVariations])]

//   return unicalsPatterns
// }
// export const randomNoteObject = (notesArray = NOTE_CHARS, octave = 2) => {
//   const note = randomArrayElement(notesArray)
//   return {
//     note,
//     noteBass: `${note}2`,
//     noteDrum: `${note}1`,
//     noteSynth: `${note}${randomNumber(5, octave)}`,
//     duration: randomDuration(),
//     velocity: randomRange()
//   }
// }
// export const splitNoteAndOctave = str => {
//   const note = str.match(/[a-g]+/i)?.[1] ?? null
//   const octave = str.match(/[0-9]+/i)?.[1] ?? null
//   return { note, octave }
// }
// export const objStat = obj => Object.entries(obj).reduce((acc, val) => (acc += `\n${val.join(' -> ')}`), '')
// export const randomNumbers = (max = 100) =>
//   Array(100)
//     .fill(1)
//     .map(v => randomNumber(max))
// export const randomMelody = ({ key, scale, octave, size, parts }) => {
//   const mainNote = `${key}${octave}`
//   const Note = Teoria.note(mainNote)
//   const Scale = Note.scale(scale).simple()

//   const mainNotes = Array(size)
//     .fill(1)
//     .map(v => randomNoteObject(Scale, octave))
//     .map(v => {
//       if (randomRange() > 0.7) {
//         return [v, v]
//       } else {
//         return v
//       }
//     })

//   const melodyBass = [...mainNotes]
//   const melodyDrum = mainNotes.map(v => {
//     const range = randomRange()
//     if (range > 0.7) {
//       return [v, v]
//     } else {
//       return v
//     }
//     // } else if (range > 0.3) {
//     //   return randomArrayElement(mainNotes)
//     // } else {
//     //   return v
//     // }
//   })
//   const melodyPart = mainNotes.map(v => {
//     const range = randomRange()
//     if (range > 0.7) {
//       return [v, v]
//     } else if (range > 0.3) {
//       // return v
//       return randomArrayElement(mainNotes)
//     } else {
//       return v
//     }
//   })
//   const melodyBassFull = Array(parts)
//     .fill(melodyBass)
//     .reduce((acc, val) => [...acc, ...val], [])
//   const melodyDrumFull = Array(parts)
//     .fill(melodyDrum)
//     .reduce((acc, val) => [...acc, ...val], [])
//   const melodyPartFull = Array(parts)
//     .fill(melodyPart)
//     .reduce((acc, val) => [...acc, ...val], [])

//   // const melodyPart = Array(size)
//   //   .fill(1)
//   //   .map(v => randomNoteObject(Scale, octave))
//   const melodyShuffled = Array(parts)
//     .fill(1)
//     .map(val => randomArrayShuffle(melodyPart))
//     .reduce((acc, val) => [...acc, ...randomArrayShuffle(melodyPart)], [])
//   const melodyDoubled = Array(parts)
//     .fill(1)
//     .reduce((acc, val) => [...acc, ...randomArrayElementDoubled(melodyPart)], [])

//   return {
//     mainNotes,
//     melodyBass: melodyBassFull,
//     melodyDrum: melodyDrumFull,
//     melodyPart: melodyPartFull
//   }
//   // return {
//   //   melodyBass,
//   //   melodyDrum,
//   //   melodyPart
//   // }
//   // return melodyPart
//   // return melodyShuffled
//   // return melodyDoubled
// }
// export const getInstrument = ({ instrument }) => {
//   const synth = new Tone.PolySynth({ volume: 0 }).toDestination()
//   const drum = new Tone.PluckSynth({ volume: -5 }).toDestination()
//   const bass = new Tone.Synth({ volume: 0 }).toDestination()
//   return { synth, bass, drum }
// }
// export const getTrack = ({ instrument, melody, transport }) => {
//   console.log('melody', melody)
//   const trackBass = new Tone.Sequence(
//     (time, { noteBass, duration, velocity }) => {
//       instrument.bass.triggerAttackRelease(noteBass, duration, time, velocity)
//     },
//     melody.melodyBass,
//     '4n'
//   ).set({ humanize: true, probability: 1, playbackRate: 1 })
//   const trackDrum = new Tone.Sequence(
//     (time, { noteDrum, duration, velocity }) => {
//       instrument.drum.triggerAttackRelease(noteDrum, duration, time, velocity)
//     },
//     melody.melodyDrum,
//     '4n'
//   ).set({ humanize: true, probability: 1, playbackRate: 1 })
//   const trackPart = new Tone.Sequence(
//     (time, { noteSynth, duration, velocity }) => {
//       instrument.synth.triggerAttackRelease(noteSynth, duration, time, velocity)
//     },
//     melody.melodyPart,
//     '4n'
//   ).set({ humanize: true, probability: 1, playbackRate: 1 })
//   const track = {
//     stop: (time = 0) => {
//       trackPart.stop(time)
//       trackBass.stop(time)
//       trackDrum.stop(time)
//     },
//     start: (time = 0) => {
//       trackPart.start(time)
//       trackBass.start(time)
//       trackDrum.start(time)
//     }
//   }

//   transport.set({ bpm: randomBpm() })

//   return track
// }
// export const getTransport = () => Tone.Transport
