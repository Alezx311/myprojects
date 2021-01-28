//* Генераторы и часто используемые функции
import * as MUSIC_VALUES from './constants'
import * as teoria from './teoriaHelpers'

export const randomRange = (min = 0.5, max = 1) => {
  const r = Math.random() * (max - min)
  return max - r
}
// Случайное число
export const randomNumber = (max = 100) => Math.floor(Math.random() * max)
// Случайная степень двойки, для длительности нот, например
export const randomPowerOfTwo = (max_power = 5) => 2 ** (randomNumber(max_power) + 1)
// Случайный елемент массива
export const randomArrayElement = array => array[randomNumber(array.length)]
// True или False c указанной вероятностью
export const randomChance = (percents = 50) => !!(randomNumber(100) > percents)
// Случайная октава
export const randomOctave = (min = 2) => min + randomNumber(3)
// Случайная нота, если дать массив с гаммой, выберет из неё
export const randomNote = (arr = MUSIC_VALUES.NOTES) => randomArrayElement(arr)
// То же что и randomNote но добавляет значение октавы
export const randomNoteAndOctave = (arr = MUSIC_VALUES.NOTES) => `${randomNote(arr)}${randomOctave()}`
// Случайный строй гитары
export const randomTuning = () => randomArrayElement(MUSIC_VALUES.TUNINGS)
// Случайное название гаммы
export const randomScaleName = () => randomArrayElement(MUSIC_VALUES.SCALES)
// Перемешивает массив в случайном порядке
export const shuffleArray = (arr = []) => arr.sort((a, b) => randomChance()).sort((a, b) => randomChance())
// Случайный символ длительности
export const randomDurationSymbol = () => randomArrayElement(['n', 't'])
// Случайная относительная длительность
export const randomDurationRelative = (max_power = 4) => `${randomPowerOfTwo(max_power)}${randomDurationSymbol()}`
// Случайное абсолютная длительность в мс
export const randomDurationAbsolute = (max_ms = 1000) => randomNumber(max_ms)
// Музыкальная фраза
export const pattern = opt => {
  const Note = teoria.Note(opt.note)
  const Scale = Note.scale(opt.scale).simple()

  const pattern = Array(opt.size)
    .fill(1)
    .map((v, i) => ({
      note: randomNote(Scale) + randomOctave(opt.octave),
      duration: randomDurationRelative(),
      strength: randomRange()
    }))

  const patterns = Array(opt.parts)
    .fill(pattern)
    .reduce((acc, val, ind) => {
      const patternArray = ind > 2 ? shuffleArray(val) : val
      return [...acc, ...patternArray]
    })

  const info = `Patterns generated!
Note: ${Note}
Scale: ${Scale}
Pattern: ${pattern.slice(0, 4).join(' -> ')}...
Patterns: ${patterns.slice(0, 4).join(' -> ')}...`
  console.log('info', info)

  const result = { pattern, patterns, info }
  console.log('result', result)

  return result
}
// Название синтезатора из Tone.js
export const instrumentName = () => randomArrayElement(MUSIC_VALUES.TONE_INSTRUMENTS)
// Название семплов из библиотеки
export const synthName = () => randomArrayElement(MUSIC_VALUES.TONE_SYNTHS)
