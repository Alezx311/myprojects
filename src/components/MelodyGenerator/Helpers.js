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

export const randomBpm = () => randomNumber(200, 150)

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

  const melodyBass = mainNotes.map(v => {
    const range = randomRange()
    if (range > 0.8) {
      return randomNoteObject(Scale, octave)
    } else if (range > 0.6) {
      return randomArrayElement(mainNotes)
    } else {
      return v
    }
  })
  const melodyDrum = mainNotes.map(v => {
    const range = randomRange()
    if (range > 0.8) {
      return randomNoteObject(Scale, octave)
    } else if (range > 0.4) {
      return randomArrayElement(mainNotes)
    } else {
      return v
    }
  })
  const melodyPart = mainNotes.map(v => {
    const range = randomRange()
    if (range > 0.8) {
      return randomNoteObject(Scale, octave)
    } else if (range > 0.6) {
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
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'custom',
      partials: [2, 1, 2, 2]
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.2,
      release: 1
    },
    volume: 10
  }).toDestination()
  const drum = new Tone.PluckSynth({ volume: -10 }).toDestination()
  const bass = new Tone.DuoSynth({ volume: -10 }).toDestination()
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
  ).set({ humanize: true, probability: 0.95, playbackRate: 1 })
  const trackDrum = new Tone.Sequence(
    (time, { noteDrum, duration, velocity }) => {
      instrument.drum.triggerAttackRelease(noteDrum, duration, time, velocity)
    },
    melody.melodyDrum,
    '4n'
  ).set({ humanize: true, probability: 0.95, playbackRate: 1 })
  const trackPart = new Tone.Sequence(
    (time, { noteSynth, duration, velocity }) => {
      instrument.synth.triggerAttackRelease(noteSynth, duration, time, velocity)
    },
    melody.melodyPart,
    '4n'
  ).set({ humanize: true, probability: 0.95, playbackRate: 1 })
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
  // const track = new Tone.Sequence(
  //   (time, { note, duration, velocity, index }) => {
  //     if (velocity > 0.5) {
  //       instrument.bass.triggerAttackRelease(note, duration, `+${time}`, velocity)
  //       instrument.drum.triggerAttackRelease(note, duration, time, velocity)
  //     }
  //     instrument.synth.triggerAttackRelease(note, duration, time, velocity)
  //   },
  //   melody,
  //   '4n'
  // )
  // track.set({ humanize: true, probability: 1, playbackRate: 1 })

  transport.set({ bpm: randomBpm() })

  return track
}
export const getTransport = () => Tone.Transport
