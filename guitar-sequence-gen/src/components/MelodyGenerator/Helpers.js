import * as Teoria from 'teoria'
import * as Tone from 'tone'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

export const initialState = {
  size: 120,
  parts: 8,
  note: 'C',
  octave: 2,
  scale: 'blues',
  text: ''
}

// Немного музыкальных констант
export const MUSIC_VALUES = {
  // Гитарные строи
  TUNINGS: [
    { name: 'E Standart', value: ['E2', 'A2', 'D3', 'G3', 'B4', 'E4'] },
    { name: 'Drop D', value: ['D2', 'A2', 'D3', 'G3', 'B4', 'E4'] },
    { name: 'Drop C', value: ['C2', 'G2', 'C3', 'F3', 'A4', 'D4'] },
    { name: 'Drop B', value: ['B2', 'F#2', 'B3', 'E3', 'G#3', 'C#4'] }
  ],
  // Названия нот
  NOTES: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#'],
  // Названия гамм
  SCALES: [
    'major',
    'minor',
    /*  'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian', */
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
  ],
  // Максимальный отступ на грифе для генератора играбельных риффов
  FRETBOARD_STEP_LENGTH: 3
}

//* Генераторы и часто используемые функции
// Случайное число
export const randNumber = (max = 100) => Math.ceil(Math.random() * max)
// Случайная степень двойки, для длительности нот, например
export const randPowerOfTwo = (max_power = 7) => parseInt(2 ** randNumber(max_power))
// Случайный елемент массива
export const randArrayElement = array => array[Math.floor(Math.random() * array.length)]
// True или False c указанной вероятностью
export const randChance = (percents = 15) => parseInt(percents) > randNumber(100)
// Случайная нота, если дать массив с гаммой, выберет из неё
export const randNote = (arr = MUSIC_VALUES.NOTES) => randArrayElement(arr)
// Случайная октава
export const randOctave = (min = initialState.octave) => 1 + randNumber(3)
// То же что и randNote но добавляет значение октавы
export const randNoteAndOctave = (arr = MUSIC_VALUES.NOTES) => `${randNote(arr)}${randOctave()}`
// Случайный строй гитары
export const randTuning = () => randArrayElement(MUSIC_VALUES.TUNINGS)
// Случайное название строя гитары
export const randTuningName = () => randArrayElement(MUSIC_VALUES.TUNINGS).name
// Случайное название гаммы
export const randScaleName = () => randArrayElement(MUSIC_VALUES.SCALES)
// Случайная метка длительности
export const randDurationSymbol = () => randArrayElement(['n', 't'])
// export const randDurationSymbol = () => randArrayElement(['n', 'm', 't', 's'])
// Случайная относительная длительность
// export const randDurationRelative = (max_power = 3) => `${2 ** randNumber(max_power)}n`
export const randDurationRelative = (max_power = 4) => `${randPowerOfTwo(max_power)}${randDurationSymbol()}`
// export const randDurationRelative = (max_power = 2) => `${2 * Math.ceil(Math.random() * 5)}n`
// Случайное абсолютная длительность в мс
export const randDurationAbsolute = (max_ms = 1000) => randNumber(max_ms)
// Конвертер мс в секунды
export const msToSec = ms => parseInt(ms / 1000)
// Конвертер секунд в мс
export const secToMs = sec => parseInt(sec * 1000)
// Соединяет ноту и октаву в строку
export const joinNoteAndOctave = (note, octave) => `${note}${octave}`
// Берёт ноту из строки
export const getNoteFromString = str => str.match(/[a-z#]+/i)?.[1]
// Берёт октаву из строки
export const getOctaveFromString = str => str.match(/\d/i)?.[1]
// Музыкальная фраза в виде текста
export const patternToText = arr => arr.map(val => `${val.note}`).join(' -> ')
// Разделитель для текста
export const textDivider = `\n${'-'.repeat(50)}\n`
// Обьект в текст
export const objectToText = obj => Object.entries(obj)
// Настройки для генерации, обьединяет полученные с настройками по умолчанию
export const getGenerateOptions = optObj => ({ ...optObj, ...initialState })

// Генерация последовательности уникальных фраз
export const Notes = state => {
  const MusicNote = Teoria.note(joinNoteAndOctave(state.note, state.octave))
  const scaleNotes = MusicNote.scale(state.scale).simple()

  return Array(state.size)
    .fill(1)
    .map((v, i) => ({ note: randNoteAndOctave(scaleNotes), duration: randDurationRelative() }))
}

export const getInstrument = state => {
  if (state.instrument === 'Synth') {
    state.instrument = new Tone.Synth().toDestination()
  } else if (state.instrument === 'MetalSynth') {
    state.instrument = new Tone.MetalSynth().toDestination()
  } else {
    state.instrument = new Tone.PolySynth(Tone.Synth, Tone.Synth).toDestination()
  }
  state.transport = Tone.Transport
  state.transport.set({ swing: Math.random() })

  return state
}

export const getSequence = state => {
  if (!state.instrument) state = getInstrument(state)
  state.pattern = Notes(state)
  state.values = []

  const track = new Tone.Sequence((time, { note, duration }) => {
    state.instrument.triggerAttackRelease(note, duration, time, Math.random())
    state.instrument.triggerAttackRelease(note, `+${duration}`, time, Math.random())

    state.instrument.triggerRelease(note, `+${duration}`)
  }, state.pattern)

  track.humanize = true
  track.probability = 0.95
  track.playbackRate = 1

  state.transport = Tone.Transport
  state.transport.set({ swing: Math.random(), swingSubdivision: randDurationRelative() })

  state.transport.start()

  return { ...state, track }
}
export const getPattern = state => {
  const track = new Tone.Pattern(
    (time, { note, duration }) => {
      state.instrument.triggerAttackRelease(note, duration, time, Math.random())
    },
    state.pattern,
    'upDown'
  )
  track.humanize = true
  track.probability = 1
  track.playbackRate = 1.5

  return { ...state, track }
}
