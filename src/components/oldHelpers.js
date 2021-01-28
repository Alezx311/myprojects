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
