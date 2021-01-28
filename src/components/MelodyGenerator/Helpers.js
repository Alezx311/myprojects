import * as Teoria from 'teoria'
import * as Tone from 'tone'
import * as TotalSerializm from 'total-serialism'

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
export const SCALES_SHORT = [
  'major',
  'minor',
  'majorpentatonic',
  'minorpentatonic',
  'blues',
  'harmonicminor',
  'melodicminor'
]
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
export const randomDurationSymbol = (durations = ['n', 'n']) => randomArrayElement(durations)

export const randomScale = () => randomArrayElement(SCALES)

export const randomBpm = () => randomNumber(170, 130)

export const randomDuration = () => `${randomPowerOfTwo(4)}${randomDurationSymbol()}`

export const randomNoteAndOctave = (notesArray = NOTES, octave = 2) =>
  `${randomArrayElement(notesArray)}${randomNumber(octave + 2, octave)}`

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
