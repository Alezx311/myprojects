import * as Teoria from 'teoria'

class values {
  static tuning = [
    { name: 'E Standart', notes: ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'] },
    { name: 'Drop D', notes: ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'] },
    { name: 'Drop C', notes: ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'] },
    { name: 'Drop C', notes: ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4'] }
  ]
  static note = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']
  static scale = [
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
}

const randNumber = (max = 6) => Math.ceil(Math.random() * max)

const randomArrayElement = array => array[Math.floor(Math.random() * array.length)]

const MusicHelpers = {
  rand: {
    note: () => {
      const note = `${randomArrayElement(values.note)}${1 + Math.ceil(Math.random() * 8)}`
      return { note, helper: Teoria.note(note) }
    },
    scale: () => {
      const Note = Teoria.note(`${randomArrayElement(values.note)}${1 + Math.ceil(Math.random() * 8)}`)
      return Note.scale(randomArrayElement(values.scale)).simple()
    },
    tuning: () => randomArrayElement(values.tuning),
    duration: () => `${2 * Math.ceil(Math.random() * 5)}n`,
    octave: () => 1 + Math.ceil(Math.random() * 5),
    sequence: (size = [8, 12], key = 'C3', scale = 'minorpentatonic') => {
      const Note = Teoria.note(key)
      const Scale = Note.scale(scale).simple()

      console.log(Note)
      console.log(Scale)

      console.log(size, key, scale)

      const shortSeq = Array(size[0])
        .fill(1)
        .map(el => ({ note: `${randomArrayElement(Scale)}${randNumber(4)}`, duration: `${2 ** randNumber(5)}n` }))
      const playable = Array(size[1]).fill(shortSeq)

      console.log(playable)

      return playable
    }
  },
  getScale: (key, name) => Teoria.note(`${key}4`).scale(name),
  getKey: (key, octave = this.rand.octave) => `${key}${octave}`
}

const randGen = [
  { note: MusicHelpers.rand.note() },
  { scale: MusicHelpers.rand.scale() },
  { tuning: MusicHelpers.rand.tuning() },
  { duration: MusicHelpers.rand.duration() },
  { octave: MusicHelpers.rand.octave() },
  { sequence: MusicHelpers.rand.sequence() }
]

console.dir(randGen)

export default MusicHelpers
