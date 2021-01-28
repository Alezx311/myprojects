import * as Teoria from 'teoria'
import { NOTES } from './constants'

export const objectToArray = obj => `Object:\n\n` + Object.entries(obj).map(p => `${p[0]}: ${p[1]}`.trim())

export const arrayToText = data => {
  return 'Array:\n\n' + data.map(v => v?.toString() ?? String(v)).join('\n')
}
// Проверяет и берёт ноту из строки
export const stringToNote = str => str.match(/[a-g#]+/i)?.[1]
// Проверяет и берёт октаву из строки
export const stringToOctave = str => str.match(/\d/i)?.[1]
// Музыкальная фраза в виде текста
export const patternToText = arr =>
  `Length: ${arr?.length}
  Rhythm: ${arr
    .map(val => String(val?.duration ?? val))
    .join(' -> ')
    .trim()}
  Pattern: ${arr
    .map(val => String(val?.note ?? val))
    .join(' -> ')
    .trim()}`
export const MusicNote = (note = 'C4') => Teoria.note(note)
export const MusicNoteScale = (note = 'C4', scale = 'minor') => note?.scale(scale).simple()
export const indexToNote = index => {
  const noteIndex = Math.floor(index / 13) + (index % 13)
  const octaveIndex = 1 + Math.floor(index / 13)

  return { noteIndex, octaveIndex, note: NOTES[noteIndex], octave: octaveIndex }
}