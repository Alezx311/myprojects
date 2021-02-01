import * as Teoria from 'teoria'
import * as Tone from 'tone'
import * as TotalSerializm from 'total-serialism'

// Notes Symbols Array
export const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
// Scale Names Array
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
// Scale Names Array (Shorted)
export const SCALES_SHORT = [
  'major',
  'minor',
  'majorpentatonic',
  'minorpentatonic',
  'blues',
  'harmonicminor',
  'melodicminor'
]
// Guitar Tunings -> Object{name: openStringNote}
export const TUNINGS = {
  'E Standart': ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop D': ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'],
  'Drop C': ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'],
  'Drop B': ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4']
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

/* const Helpers = require('../Helpers')
const CONSTANTS = require('../CONSTANTS')

const getArray = ({ size = 100 }) => Array(size).fill(1)
const getUnicalNumbers = ({ size = 100 }) => getUnicals(getArray(size).map(v => Helpers.randomBpm()))
const RANGE_MIN = 0.001
const RANGE_MAX = 0.999
const NUMBER_MIN = 0
const NUMBER_MAX = 9999
const NUMBERS = getUnicalNumbers()
const getUnicals = getArray => getArray && [...new Set([...getArray])]

describe('Helpers Test', () => {
  it('getArray', () => {
    const result = getArray()
    const result10 = getArray({ size: 10 })
    const result25 = getArray({ size: 25 })

    expect(result).toHaveLength(100)
    expect(result10).toHaveLength(10)
    expect(result25).toHaveLength(25)
  })
  it('getUnicalNumbers', () => {
    const result = getUnicalNumbers()
    const notNumbers = result.filter(v => typeof v !== 'number')

    expect(result.length).toBeGreaterThan(RANGE_MIN).toBeLessThan(RANGE_MAX)
    expect(notNumbers).toHaveLength(0)
  })
  it('randomRange', () => {
    const result = Helpers.randomRange()

    expect(result).toBeGreaterThan(RANGE_MIN)
    expect(result).toBeLessThan(RANGE_MAX)
  })
  it('randomNumber', () => {
    const result = Helpers.randomNumber()

    expect(result).toBeGreaterThan(NUMBER_MIN)
    expect(result).toBeLessThan(NUMBER_MAX)
  })
  it('randomPowerOfTwo', () => {
    const result = Helpers.randomPowerOfTwo()

    expect(result % 2).toBe(0)
  })
  it('randomArrayElement', () => {
    const result = Helpers.randomArrayElement(NUMBERS)

    expect(NUMBERS).toContain(result)
  })
  it('randomBoolean', () => {
    const result = Helpers.randomBoolean()

    expect(result).toBeBoolean()
  })
  it('randomArrayShuffle', () => {
    const numbersSorted = NUMBERS.sort((a, b) => a - b)
    const result = Helpers.randomArrayShuffle(NUMBERS)
    const resultSorted = result.sort((a, b) => a - b)

    expect(numbersSorted).not.toBeEqual(result)
    expect(numbersSorted).toBeEqual(resultSorted)
  })
  it('randomArrayElementChange', () => {
    const result = Helpers.randomArrayElementChange(NUMBERS)

    expect(result).toBeTruthy()
    expect(getUnicals(result)).toHaveLength(result.length - 1)
  })
  it('randomArrayElementDoubled', () => {
    const result = Helpers.randomArrayElementDoubled(NUMBERS)
    const doubledElement = result.find(v => typeof v !== 'number')

    expect(result).toBeTruthy()
    expect(doubledElement).toHaveLength(2)
  })
  it('randomDurationSymbol', () => {
    const result = Helpers.randomDurationSymbol()

    expect(CONSTANTS.DURATION_SYMBOLS).toContain(result)
  })
  it('randomScale', () => {
    const result = Helpers.randomScale()

    expect(CONSTANTS.SCALES).toContain(result)
  })
  it('randomBpm', () => {
    const result = Helpers.randomBpm()

    expect(result).toBeGreaterThan(0)
    expect(result).toBeLessThan(300)
  })
  it('randomDuration', () => {
    const result = Helpers.randomDuration()

    expect(result).toMatch(/^\d+[ntms]$/i)
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThan(4)
  })
  it('randomNote', () => {
    const result = Helpers.randomNote()

    expect(CONSTANTS.NOTES).toContain(result)
  })
  it('randomNoteAndOctave', () => {
    const result = Helpers.randomNoteAndOctave()

    expect(result).toMatch(/[a-g#0-9]/i)
    expect(result).toBeGreaterThanOrEqual(2)
    expect(result).toBeLessThan(4)
  })
  it('noteScale', () => {
    const result = Helpers.noteScale('C', 'minor')

    expect(result.length).toBeGreaterThanOrEqual(4)
    expect(result.Note).toBeDefined()
    expect(result.Scale).toBeDefined()
    expect(result.Scale.length).toBeGreaterThanOrEqual(5)
  })
  it('randomPatterns', () => {
    const result = Helpers.randomPatterns()

    expect(result.length).toBeDefined()
    expect(result.length).toBeGreaterThanOrEqual(1)
  })
  it('randomNoteObject', () => {
    const result = Helpers.randomNoteObject()

    expect(result).toHaveProperty('note')
    expect(result).toHaveProperty('noteBass')
    expect(result).toHaveProperty('noteDrum')
    expect(result).toHaveProperty('noteSynth')
    expect(result).toHaveProperty('duration')
    expect(result).toHaveProperty('velocity')
  })
  it('splitNoteAndOctave', () => {
    const result = Helpers.splitNoteAndOctave('D#2')

    expect(result.note).toBeDefined()
    expect(result.octave).toBeDefined()
    expect(result.note).toBeEqual('D#')
    expect(result.octave).toBeEqual('2')
  })
  it.skip('objStat', () => {
    const result = Helpers.objStat()

    expect(result).toBeTruthy()
  })
  it.skip('randomNumbers', () => {
    const result = Helpers.randomNumbers()

    expect(result).toBeTruthy()
  })
  it.skip('randomMelody', () => {
    const result = Helpers.randomMelody()

    expect(result.mainNotes).toBeDefined().and.toBeTruthy()
    expect(result.melodyBass).toBeDefined().and.toBeTruthy()
    expect(result.melodyDrum).toBeDefined().and.toBeTruthy()
    expect(result.melodyPart).toBeDefined().and.toBeTruthy()
  })
  it.skip('getInstrument', () => {
    const result = Helpers.getInstrument()

    expect(result.synth).toBeDefined()
    expect(result.bass).toBeDefined()
    expect(result.drum).toBeDefined()
  })
  it.skip('getTrack', () => {
    const result = Helpers.getTrack()

    expect(result).toBeTruthy()
  })
  it.skip('getTransport', () => {
    const result = Helpers.getTransport()

    expect(result).toBeTruthy()
  })
})
 */
