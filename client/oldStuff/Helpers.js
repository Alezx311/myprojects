import * as Teoria from 'teoria'
import * as Tone from 'tone'
import { Joi } from 'joi'
// import * as TotalSerialism from 'total-serialism'

export class Random {
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
  //* Random Note Object with all values for play sound. Generated from given values
  static NoteObject = (notesArray = NOTES, minOctave = 2) => {
    const noteChar = this.NoteChar(notesArray)
    const octave = this.Octave(1, minOctave)
    const noteAndOctave = `${noteChar}${octave}`
    const duration = this.DurationRelative()
    const velocity = this.Velocity()
    const color = NOTE_COLORS?.[noteChar] ?? this.Color()

    return { noteChar, octave, noteAndOctave, duration, velocity, color }
  }
  //* Phrases
  // static Phrases = (noteChar, scaleName, minOctave) => {}
  //* BassMelody
  // static BassMelody = (noteChar, scaleName, minOctave) => {}
  //* DrumMelody
  // static DrumMelody = (noteChar, scaleName, minOctave) => {}
  //* LeadMelody
  // static LeadMelody = (noteChar, scaleName, minOctave) => {}
  //* GuitarPhrases
  // static GuitarPhrases = (fretNotesArray, phrasesDuration) => {}
}
class Helpers {
  //* NoteToColor
  static NoteToColor = str => NOTE_COLORS?.[str] ?? false
  //* ColorToNote
  static ColorToNote = str => Object.entries(NOTE_COLORS).find(([key, value]) => value === str && key)
  //* SomeArrayElementDouble
  static SomeArrayElementDouble = array => {
    const elementIndex = Random.Number(0, array.length)
    const doubled = [array[elementIndex], array[elementIndex]]
    array[elementIndex] = doubled

    return array
  }
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
    const noteChar = str.match(/^[a-g#]+/i)
    const octave = str.match(/[1-6]$/i)

    return { noteChar, octave }
  }
  //* NoteValues
  static NoteValues = (noteChar, scaleName) => {
    const Note = Teoria.note(noteChar)
    const Scale = Note.scale(scaleName)
    const Chord = Teoria.chord(noteChar)

    const Intervals = {
      scale: Scale.scale.map(v => {
        const step = v
        const interval = Note.scale(scaleName).interval(v)
        const inverted = interval.invert()
        const noteChar = interval.name()
        const arpeggio = interval.chord().notes().toString()

        return { step, interval, inverted, noteChar, arpeggio }
      }),
      steps: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'].map(v => {
        const step = v
        const interval = Note.scale(scaleName).interval(v)
        const inverted = interval.invert()
        const noteChar = interval.name()
        const arpeggio = interval.chord().notes().toString()

        return { step, interval, inverted, noteChar, arpeggio }
      })
    }
    const Info = {
      Note: `Note Info:
    Note: ${Note.toString()}
    Note.octave: ${Note.octave()}
    Note.duration: ${Note.duration}
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
    Note.toString: ${Note.toString()}`,
      Scale: `Scale from Note (${scaleName}):
    Scale:  ${Scale.toString()}
    Scale.name:  ${Scale.name.toString()}
    Scale.tonic:  ${Scale.tonic.toString()}
    Scale.notes:  ${Scale.notes().toString()}
    Scale.simple:  ${Scale.simple().toString()}
    Scale.type:  ${Scale.type().toString()}`,
      Chord: `Chord from Note:
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
    Chord.toString: ${Chord.toString()}`,
      Interval: `Interval from Note: ${noteChar}, Scale: ${scaleName}:
    Interval: ${Interval.toString()}
    Interval.invert: ${Interval.invert('m3').toString()}
    Interval.coord: ${Interval.coord.toString()}
    Interval.number: ${Interval.number()}
    Interval.value: ${Interval.value()}
    Interval.base: ${Interval.base()}
    Interval.type: ${Interval.type()}
    Interval.quality: ${Interval.quality()}
    Interval.qualityValue: ${Interval.qualityValue()}
    Interval.direction: ${Interval.direction()}
    Interval.semitones: ${Interval.semitones()}
    Interval.simple: ${Interval.simple().toString()}
    Interval.octaves: ${Interval.octaves()}
    Interval.isCompound: ${Interval.isCompound()}`
    }

    return { Note, Scale, Chord, Intervals, Info }
  }
  //* ObjStat}
  static ObjStat = obj => {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const entries = Object.entries(obj)

    return `Object: ${obj}\nKeys: ${keys.length}\nValues: ${values.length}\nEntries: ${entries.length}`
  }
  //* GetInstrument
  static GetInstrument = name => new Tone[name]().toDestination()
  //* GetTrack
  static GetTrack = ({ synth, phrase, divider, track }) => {
    track = new Tone.Sequence(
      (time, { noteAndOctave, duration, velocity }) => {
        synth.triggerAttackRelease(noteAndOctave, duration, time, velocity)
      },
      phrase,
      divider
    )
    return { synth, phrase, divider, track }
  }
  static GetTransport = () => Tone ?? Tone.Transport
}
export class Validate {
  static isValid = ({ error, value }) => (value &&= error)
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
export class Matchers {
  static noteChar = str => new RegExp('^[a-g#]+', 'i').exec(str).join()
  static octave = str => new RegExp('\\d$', 'i').exec(str).join()
  static durationValue = str => new RegExp('^\\d+', 'i').exec(str).join()
  static durationSymbol = str => new RegExp('[ntms]$', 'i').exec(str).join()
}

export const randomRange = () => Math.random()

export const randomNumber = (max = 100, min = 0) => ~~(min + randomRange() * (max - min))

export const randomPowerOfTwo = (max = 5) => 2 ** randomNumber(max, 2)

export const randomArrayElement = arr => (arr.length ? arr[randomNumber(arr.length)] : null)

export const randomBoolean = () => randomNumber() > 50

export const randomArrayShuffle = arr => arr.sort((a, b) => (randomBoolean() ? 1 : -1))

export const randomArrayElementChange = arr => {
  const el = randomArrayElement(arr)
  const ind = randomNumber(arr.length)
  arr[ind] = el
  return arr
}

export const randomArrayElementDoubled = arr => {
  const { note, velocity } = randomArrayElement(arr) ?? { note: 'c2', duration: '4n' }
  const ind = randomNumber(arr.length)
  arr[ind] = [[{ note, velocity, duration: '16n' }], [{ note, velocity, duration: '16n' }]]
  return arr
}
export const randomDurationSymbol = (durations = ['n', 't']) => randomArrayElement(durations)

export const randomScale = () => randomArrayElement(SCALES)

export const randomBpm = () => randomNumber(170, 130)

export const randomDuration = () => `${randomPowerOfTwo(4)}${randomDurationSymbol()}`

export const randomNote = (arr = NOTES) => randomArrayElement(arr)

export const randomNoteAndOctave = (arr = NOTES, octave = 2) => `${randomArrayElement(arr)}${octave}`

export const noteScale = (noteChar, scaleName) => {
  if (!noteChar || !scaleName) {
    throw new Error(`Invalid noteChar: ${noteChar} or scaleName: ${scaleName} at Helpers.noteScale()`)
  }

  const Note = Teoria.note(noteChar)
  const Scale = Note.scale(scaleName).simple()

  return { Note, Scale }
}

export const randomPatterns = (arr = NOTES, len = 4) => {
  const pattern = Array(len)
    .fill(1)
    .map(v => randomArrayElement(arr))
  const patternsVariations = Array(len ** 2)
    .fill(pattern)
    .map(v => v.sort(() => Math.random() - 0.5))
  const unicalsPatterns = [...new Set([...patternsVariations])]

  return unicalsPatterns
}

export const randomNoteObject = (notesArray = NOTES, octave = 2) => {
  const note = randomArrayElement(notesArray)
  return {
    note,
    noteBass: `${note}2`,
    noteDrum: `${note}1`,
    noteSynth: `${note}${randomNumber(5, octave)}`,
    duration: randomDuration(),
    velocity: randomRange()
  }
}

export const splitNoteAndOctave = str => {
  const note = str.match(/[a-g]+/i)?.[1] ?? null
  const octave = str.match(/[0-9]+/i)?.[1] ?? null
  return { note, octave }
}

export const objStat = obj => Object.entries(obj).reduce((acc, val) => (acc += `\n${val.join(' -> ')}`), '')

export const randomNumbers = (max = 100) =>
  Array(100)
    .fill(1)
    .map(v => randomNumber(max))

export const randomMelody = ({ key, scale, octave, size, parts }) => {
  const mainNote = `${key}${octave}`
  const Note = Teoria.note(mainNote)
  const Scale = Note.scale(scale).simple()

  const mainNotes = Array(size)
    .fill(1)
    .map(v => randomNoteObject(Scale, octave))
    .map(v => {
      if (randomRange() > 0.7) {
        return [v, v]
      } else {
        return v
      }
    })

  const melodyBass = [...mainNotes]
  const melodyDrum = mainNotes.map(v => {
    const range = randomRange()
    if (range > 0.7) {
      return [v, v]
    } else {
      return v
    }
    // } else if (range > 0.3) {
    //   return randomArrayElement(mainNotes)
    // } else {
    //   return v
    // }
  })
  const melodyPart = mainNotes.map(v => {
    const range = randomRange()
    if (range > 0.7) {
      return [v, v]
    } else if (range > 0.3) {
      // return v
      return randomArrayElement(mainNotes)
    } else {
      return v
    }
  })
  const melodyBassFull = Array(parts)
    .fill(melodyBass)
    .reduce((acc, val) => [...acc, ...val], [])
  const melodyDrumFull = Array(parts)
    .fill(melodyDrum)
    .reduce((acc, val) => [...acc, ...val], [])
  const melodyPartFull = Array(parts)
    .fill(melodyPart)
    .reduce((acc, val) => [...acc, ...val], [])

  // const melodyPart = Array(size)
  //   .fill(1)
  //   .map(v => randomNoteObject(Scale, octave))
  const melodyShuffled = Array(parts)
    .fill(1)
    .map(val => randomArrayShuffle(melodyPart))
    .reduce((acc, val) => [...acc, ...randomArrayShuffle(melodyPart)], [])
  const melodyDoubled = Array(parts)
    .fill(1)
    .reduce((acc, val) => [...acc, ...randomArrayElementDoubled(melodyPart)], [])

  return {
    mainNotes,
    melodyBass: melodyBassFull,
    melodyDrum: melodyDrumFull,
    melodyPart: melodyPartFull
  }
  // return {
  //   melodyBass,
  //   melodyDrum,
  //   melodyPart
  // }
  // return melodyPart
  // return melodyShuffled
  // return melodyDoubled
}
export const getInstrument = ({ instrument }) => {
  const synth = new Tone.PolySynth({ volume: 0 }).toDestination()
  const drum = new Tone.PluckSynth({ volume: -5 }).toDestination()
  const bass = new Tone.Synth({ volume: 0 }).toDestination()
  return { synth, bass, drum }
}
export const getTrack = ({ instrument, melody, transport }) => {
  console.log('melody', melody)
  const trackBass = new Tone.Sequence(
    (time, { noteBass, duration, velocity }) => {
      instrument.bass.triggerAttackRelease(noteBass, duration, time, velocity)
    },
    melody.melodyBass,
    '4n'
  ).set({ humanize: true, probability: 1, playbackRate: 1 })
  const trackDrum = new Tone.Sequence(
    (time, { noteDrum, duration, velocity }) => {
      instrument.drum.triggerAttackRelease(noteDrum, duration, time, velocity)
    },
    melody.melodyDrum,
    '4n'
  ).set({ humanize: true, probability: 1, playbackRate: 1 })
  const trackPart = new Tone.Sequence(
    (time, { noteSynth, duration, velocity }) => {
      instrument.synth.triggerAttackRelease(noteSynth, duration, time, velocity)
    },
    melody.melodyPart,
    '4n'
  ).set({ humanize: true, probability: 1, playbackRate: 1 })
  const track = {
    stop: (time = 0) => {
      trackPart.stop(time)
      trackBass.stop(time)
      trackDrum.stop(time)
    },
    start: (time = 0) => {
      trackPart.start(time)
      trackBass.start(time)
      trackDrum.start(time)
    }
  }

  transport.set({ bpm: randomBpm() })

  return track
}
export const getTransport = () => Tone.Transport