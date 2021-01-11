import * as Teoria from 'teoria'

// Немного музыкальных констант
export const VALUES = {
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
  KEY: 'C',
  START_OCTAVE: 2,
  SCALES: 'minorpentatonic',
  PATTERN_LENGTH: 20,
  SIZE1: 4,
  SIZE2: 4,
  OCTAVE_MIN: 2,
  OCTAVE_MAX: 6,
  PATTERN_REPEAT_TONICAL_NOTE_EVERY: 8,
  PATTERN_EXAMPLE_SIZE: 8
}

//* Генераторы и часто используемые функции
// Случайное число
export const randNumber = (max = 100) => Math.ceil(Math.random() * max)
// Случайная степень двойки, для длительности нот, например
export const randPowerOfTwo = (max_power = 7) => parseInt(2 ** max_power)
// Случайный елемент массива
export const randArrayElement = array => array[Math.floor(Math.random() * array.length)]
// True или False c указанной вероятностью
export const randChance = percents => parseInt(percents) > randNumber(100)
// Случайная нота, если дать массив с гаммой, выберет из неё
export const randNote = (arr = VALUES.NOTES) => randArrayElement(arr)
// Случайная октава
export const randOctave = (max = DEFAULTS.OCTAVE_MAX) => 2 + randNumber(max)
// То же что и randNote но добавляет значение октавы
export const randNoteAndOctave = (arr = VALUES.NOTES) => randNote(arr) + randOctave()
// Случайный строй гитары
export const randTuning = () => randArrayElement(VALUES.TUNINGS)
// Случайное название строя гитары
export const randTuningName = () => randArrayElement(VALUES.TUNINGS).name
// Случайное название гаммы
export const randScaleName = () => randArrayElement(VALUES.SCALES)
// Случайная метка длительности
export const randDurationSymbol = () => randArrayElement(['n', 'm', 't', 's'])
// Случайная относительная длительность
export const randDurationRelative = (max_power = 7) => `${randPowerOfTwo(max_power)}${randDurationSymbol()}`
// Случайное абсолютная длительность в мс
export const randDurationAbsolute = (max_ms = 5000) => Math.floor(Math.random() * max_ms)
// Конвертер мс в секунды
export const msToSec = ms => parseInt(ms / 1000)
// Конвертер секунд в мс
export const secToMs = sec => parseInt(sec * 1000)
// Соединяет ноту и октаву в строку
export const joinNoteAndOctave = (note, octave) => `${note}${octave}`
// Берёт ноту из строки
export const noteFromStr = str => str.match(/[a-z#]+/i)?.[1]
// Берёт октаву из строки
export const octaveFromStr = str => str.match(/\d/i)?.[1]
// Обьект с пустыми значениями, для инициализаций в будущем
export const musicEventObject = () => ({ note: null, duration: null, octave: null, index: null })
// Музыкальная фраза в виде текста
export const patternToText = arr => arr.map(val => `${val.note}`).join(' -> ')
// Разделитель для текста
export const textDivider = `\n${'-'.repeats(50)}\n`
// Обьект в текст
export const objectToText = obj => Object.entries(obj)
// Настройки для генерации, обьединяет полученные с настройками по умолчанию
export const getGenerateOptions = optObj => {
  const generateOptions = {
    createdAt: Date.now(),
    key: optObj?.key ?? DEFAULTS.KEY,
    start_octave: parseInt(optObj?.start_octave ?? DEFAULTS.START_OCTAVE),
    scale: optObj?.scale ?? DEFAULTS.SCALES,
    size: parseInt(optObj?.size ?? DEFAULTS.PATTERN_LENGTH),
    repeatEvery: parseInt(optObj?.repeatEvery ?? DEFAULTS.PATTERN_REPEAT_TONICAL_NOTE_EVERY)
  }

  return generateOptions
}

// Генерация музыкальных фраз
//? @key - Тональность
//? @start_octave - Начальная октава
//? @scale - Гамма
//? @size - Длина фразы
//? @repeatTonicalNote - Повторять тонику каждую n ноту
export const Pattern = optionsObject => {
  const options = getGenerateOptions(optionsObject)
  const { key, start_octave, scale, size, repeatEvery } = options

  const mainNote = joinNoteAndOctave(key, start_octave)
  const mainDuration = randDurationRelative()
  const mainNoteObj = { note: mainNote, duration: mainDuration }
  const MusicNote = Teoria.note(mainNote)

  const notesArray = MusicNote.scale(scale).simple()
  const durationsArray = Array(4)
    .fill(1)
    .map(val => randDurationRelative())

  // Версия со случайными значениями
  const randomizedVersion = Array(size)
    .fill(1)
    .map(patternValue => ({
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
  const patternInfo = `Patterns generated successfully!
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

  console.log(patternInfo)

  //! return { randomizedVersion, repeatsVersion, patternInfo }
  return repeatsVersion
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
const getExamples = (examples_size = 4) => {
  const pattOptions = {
    size: DEFAULTS.PATTERN_EXAMPLE_SIZE
  }

  const examples = Array(examples_size)
    .fill(1)
    .map(val => {
      const pattern = Pattern(pattOptions)
      const sequence = Sequence(pattOptions)

      return { pattern, sequence }
    })

  return examples
}
console.dir(getExamples(4))
