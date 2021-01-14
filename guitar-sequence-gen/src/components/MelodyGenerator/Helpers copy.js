// const Teoria = require('teoria')
import * as Teoria from 'teoria'
import * as ToneHelpers from './ToneHelpers'
import * as MusicValues from './MusicValues'
//* Генераторы и часто используемые функции
// Случайное число
const randNumber = (max = 100) => Math.ceil(Math.random() * max)
// Случайная степень двойки, для длительности нот, например
const randPowerOfTwo = (max_power = 7) => parseInt(2 ** randNumber(max_power))
// Случайный елемент массива
const randArrayElement = array => array[Math.floor(Math.random() * array.length)]
// True или False c указанной вероятностью
const randChance = (percents = 50) => parseInt(percents) > randNumber(100)
// Случайная нота, если дать массив с гаммой, выберет из неё
const randNote = (arr = MUSIC_VALUES.NOTES) => randArrayElement(arr)
// Случайная октава
const randOctave = (min = DEFAULTS.octave_min, max = DEFAULTS.octave_max) => min + randNumber(max - min)
// То же что и randNote но добавляет значение октавы
const randNoteAndOctave = (arr = MUSIC_VALUES.NOTES) => `${randNote(arr)}${randOctave()}`
// Случайный строй гитары
const randTuning = () => randArrayElement(MUSIC_VALUES.TUNINGS)
// Случайное название строя гитары
const randTuningName = () => randArrayElement(MUSIC_VALUES.TUNINGS).name
// Случайное название гаммы
const randScaleName = () => randArrayElement(MUSIC_VALUES.SCALES)
// Случайная метка длительности
const randDurationSymbol = () => randArrayElement(['n', 'm', 't', 's'])
// Случайная относительная длительность
const randDurationRelative = (max_power = 5) => `${randPowerOfTwo(max_power)}${randDurationSymbol()}`
// Случайное абсолютная длительность в мс
const randDurationAbsolute = (max_ms = 1000) => randNumber(max_ms)
// Конвертер мс в секунды
const msToSec = ms => parseInt(ms / 1000)
// Конвертер секунд в мс
const secToMs = sec => parseInt(sec * 1000)
// Соединяет ноту и октаву в строку
const joinNoteAndOctave = (note, octave) => `${note}${octave}`
// Берёт ноту из строки
const getNoteFromString = str => str.match(/[a-z#]+/i)?.[1]
// Берёт октаву из строки
const getOctaveFromString = str => str.match(/\d/i)?.[1]
// Музыкальная фраза в виде текста
const patternToText = arr => arr.map(val => `${val.note}`).join(' -> ')
// Разделитель для текста
const textDivider = `\n${'-'.repeat(50)}\n`
// Обьект в текст
const objectToText = obj => Object.entries(obj)
// Настройки для генерации, обьединяет полученные с настройками по умолчанию
const getGenerateOptions = optObj => ({ ...optObj, ...DEFAULTS })

export const initPlayer = () => new Tone.PolySynth().toDestination()

// Генерация музыкальных фраз
//? @note - Тональность
//? @octave_min - Начальная октава
//? @octave_max - Начальная октава
//? @scale - Гамма
//? @size - Длина фразы
//? @repeatTonicalNote - Повторять тонику каждую n ноту
export const Pattern = ({ key, scale, size, octave_min, octave_max, synth }) => {
  const MainNote = Teoria.note(joinNoteAndOctave(key, octave_min))
  const notesArray = MainNote.scale(scale).simple()

  const patternArray = Array(size)
    .fill(1)
    .map(note => randNoteAndOctave(notesArray))

  const playSoundCallback = (note, duration, time = Tone.now()) => {
    console.log('playSoundCallback play :>> ', { note, duration, time })
    synth.triggerAttackRelease(note, duration, time)
  }

  const patternObject = new Tone.Pattern(playSoundCallback, patternArray, 'updown')

  return patternObject
}

// Генерация последовательности уникальных фраз
export const Sequence = ({ key, scale, size, octave_min, octave_max, synth }) => {
  const MainNote = Teoria.note(joinNoteAndOctave(key, octave_min))
  const notesArray = MainNote.scale(scale).simple()

  const playSoundCallback = (note, duration, time = Tone.now()) => {
    console.log('playSoundCallback play :>> ', { note, duration, time })
    synth.triggerAttackRelease(note, duration, time)
  }

  const patterns = Array(size)
    .fill(1)
    .map(val => randNoteAndOctave(notesArray))

  const sequenceObject = new Tone.Sequence(playSoundCallback, patterns, randDurationRelative())

  return sequenceObject
}
// Генерация указанного количества примеров
export const getExamples = opt => {
  const options = getGenerateOptions(opt)

  const examples = Array(options.size)
    .fill(1)
    .map(val => {
      const pattern = Pattern(options)
      const sequence = Sequence(options)

      return { pattern, sequence }
    })

  return examples
}
// getExamples(1)
