import * as Teoria from 'teoria'

import {
  NOTES,
  SCALES,
  COLOR_CLASSNAMES,
  COLOR_NAMES,
  COLOR_CODES,
  GUITAR_TUNINGS,
  SYNTHS,
  INSTRUMENTS,
  DURATION_CHARS,
  INTERVAL_CHARS
} from './constants'

export class Note {
  static getOctave = str => `${str}${Random.number(3, 5)}`
  static charIndex = char => NOTES.indexOf(char.toUpperCase())
  static melody = (str, scaleName = 'minorpentatonic') => {
    const data = Teoria.note(str)
    const scaleNotes = data
      .scale(scaleName)
      .simple()
      .map(v => this.getOctave(v))
    const shuffled = Random.arrayShuffles([...scaleNotes, ...scaleNotes])
    return shuffled
    // return Array(20)
    //   .fill(1)
    //   .map(v => Random.arrayElement(shuffled))
  }
}
export class Random {
  static range = () => Math.random().toFixed(2)
  static boolean = (chance = 50) => this.number(1, 100) > chance
  static number = (min = 1, max = 100) => Math.floor(this.range() * (max - min)) + min
  static numbers = (size = 10, max = 100) => this.array(size).map(v => this.number(0, max))
  static numbersDeep = (len = 10, max = 4) => this.numbers(len, max).map(v => (v > 1 ? this.numbers(v, max) : v))
  static values = arr => this.array(10).map(v => this.arrayElement(arr))
  static array = (size = 10, fill = this.boolean(20)) => Array(size).fill(fill)
  static arrays = (size = 10, maxDeep = 5) => this.array(size).map(v => this.array(this.number(2, maxDeep)))
  static arrayPart = (arr, chance = 20) => arr.filter((v, i) => this.boolean(chance))
  static arrayGrow = (arr, growSize = 10) => [...arr, ...this.array(growSize).map((v, i) => this.arrayElement(arr))]
  static arrayExamples = (size = 10) => this.array(size).map(v => this.example())
  static arraySequence = (start = 1, end = 100) => this.array(end).map((v, i) => start + i)
  static arrayChange = (size = 10, arr) => this.arrayElement(this.array(size).map(v => this.arrayShuffle(arr)))
  static arrayMerge = (arr, ...arrays) => this.arrayUnicals([...arr, ...arrays])
  static arrayDouble = arr => [arr, arr]
  static arrayRepeats = (arr, repeats = 2) => this.array(repeats).reduce((acc, v) => [...acc, ...arr], arr)
  static arrayUnicals = arr => [...new Set([...arr])]
  static arrayShuffle = arr => arr.sort(() => this.range() - 0.5)
  static arrayShuffles = (arr, repeats = 2) => this.arrayShuffle(this.arrayRepeats(arr, repeats))
  static arrayShuffleUnicals = arr => this.arrayUnicals(this.array(arr.length * 2).map(v => this.arrayShuffle(arr)))
  static arrayIndex = arr => arr && this.number(0, arr.length)
  static arrayElement = (arr, i = this.arrayIndex(arr)) => arr && arr[i]
  static arrayDoubleSome = (arr, chance = 50) => this.arrayShuffles(arr).map(v => (this.boolean(20) ? [v, v] : v))
  static objectKey = obj => this.arrayElement(Object.keys(obj))
  static objectProp = (obj, key = this.objectKey(obj)) => obj[key]
  static note = (notes = NOTES) => this.arrayElement(notes)
  static velocity = () => 0.5 + this.range() / 2
  static notes = (size = 10, notes = NOTES) => this.values(notes, size)
  static scale = () => this.arrayElement(SCALES)
  static tuning = () => this.objectKey(GUITAR_TUNINGS)
  static instrumentName = () => this.arrayElement(Object.keys(INSTRUMENTS))
  static instrument = () => this.arrayElement(INSTRUMENTS)
  static synth = () => this.arrayElement(SYNTHS)
  static duration = () => `${this.number(1, 4) ** 2}${this.arrayElement(DURATION_CHARS)}`
  static interval = () => this.arrayElement(INTERVAL_CHARS)
  static sample = () => this.objectProp(INSTRUMENTS)
  static rhythmValues = (size = 10, max = 4) => this.numbers(size, max)
  static rhythmValuesDeep = (size = 10, max = 4) => this.numbersDeep(size, max)
  static rhythmNotes = (size = 10) => this.numbers(size, 1, 4).map(v => (v > 1 ? this.notes(v) : this.note()))
  static rhythmNotesDeep = (size = 10, max = 4, notes = this.notes(size)) =>
    this.arrayDeepSome(this.rhythmNotes(size, notes), notes)
  static colorName = () => Random.arrayElement(COLOR_NAMES)
  static colorHex = () => Random.arrayElement(COLOR_CODES)
  static colorClassName = () => Random.arrayElement(COLOR_CLASSNAMES)
}
