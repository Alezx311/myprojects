// const Teoria = require('teoria')
import * as Teoria from 'teoria'

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
  ],
  // Максимальный отступ на грифе для генератора играбельных риффов
  FRETBOARD_STEP_LENGTH: 3
}
// Настройки по умолчанию
export const DEFAULTS = {
  size: 4,
  parts: 4,
  note: 'C',
  octave_min: 2,
  octave_max: 6,
  scale: 'minor',
  pattern: {},
  sequence: [],
  isPlaying: false,
  text: '',
  symbol: ''
}

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

// Генерация музыкальных фраз
//? @note - Тональность
//? @octave_min - Начальная октава
//? @octave_max - Начальная октава
//? @scale - Гамма
//? @size - Длина фразы
//? @repeatTonicalNote - Повторять тонику каждую n ноту
export const Pattern = optionsObject => {
  const options = getGenerateOptions(optionsObject)
  const { note, octave_min, scale, size, repeatEvery } = options

  const mainNote = joinNoteAndOctave(note, octave_min)
  const mainDuration = randDurationRelative()

  const MusicNote = Teoria.note(mainNote)
  const notesArray = MusicNote.scale(scale).simple()
  const durationsArray = Array(size)
    .fill(1)
    .map(val => randDurationRelative())

  // TODO Для играбельной версии, будет создавать мелодию, проверяя играбельность на грифе.
  // Каждая след нота должна быть не дальше 3 ладов, должна не выбиватся из композиции и быть уместной.
  // const stepsVersion = Array(size).fill(mainNoteObj)

  // Версия со случайными значениями
  const randomizedVersion = Array(size)
    .fill(1)
    .map(obj => ({
      note: randArrayElement(notesArray),
      duration: randArrayElement(durationsArray)
    }))

  // Версия с повторениями тоники каждые n нот
  const repeatsVersion = randomizedVersion.map((patternValue, patternIndex) => {
    if (patternIndex % repeatEvery === 0) return patternValue

    patternValue.note = randArrayElement(notesArray)
    patternValue.duration = randArrayElement(durationsArray)

    return patternValue
  })

  // Информационное сообщение для быстрого просмотра фраз и тд
  const text = `Patterns generated successfully!
Created on ${Date.now() - options.createdAt} ms
Received Values: ${objectToText(optionsObject)}
Default Values: ${objectToText(DEFAULTS)}
${textDivider}
Randomized Version: 
${textDivider}
${patternToText(randomizedVersion)}
${textDivider}
With Tonical Note Repeats Version:
${textDivider}
${patternToText(repeatsVersion)}
${textDivider}`.trim()

  return { randomizedVersion, repeatsVersion, text }
}
// Генерация последовательности уникальных фраз
export const Sequence = optionsObject => {
  const options = getGenerateOptions(optionsObject)

  const patterns = Array(100)
    .fill(1)
    .map(val => Pattern(options))

  return new Set([...patterns])
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
