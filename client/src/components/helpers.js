import * as Tone from 'tone'
import * as Teoria from 'teoria'
import { SAMPLE_NAMES, SAMPLE_FILES } from './samplesData'

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
  // Teoria
  static values = (note = '') => {
    if (!note?.trim()) {
      note = Random.note()
    }

    return this.loadDataFull(note)
  }
  static check = note => this.matchValues(note).includes(false)
  static checkChar = str => NOTES.includes(str?.toUpperCase())
  static midi = note => note?.midi() ?? Random.number(1, 88)
  static matchValues = note => {
    const [char, octave] = note.match(/^([a-g#]+)([1-8])/) ?? [false, false]

    return [char, octave]
  }
  static loadNote = note => Teoria.note(note)
  static loadNoteFull = note => {
    if (!note) return null

    const values = this.loadNote(note)
    const char = values.name()
    const octave = values.octave()
    const text = values.toString()
    const color = this.loadColor(note)

    return { note, values, char, octave, text, color }
  }
  static loadScaleFull = (note, scaleName = 'minor') => this.loadNote(note).scale(scaleName)
  static loadScale = (note, scaleName = 'minor') => this.loadScaleFull(note, scaleName).simple()

  static loadColor = note => COLOR_CODES[this.toMidi(note) % 12]
  static loadGuitarTuning = tuning => GUITAR_TUNINGS[tuning]
  static loadGuitarStringNotes = (note, size = 24) => {
    const steps = [note, this.loadSteps(note, size)]
    const frets = steps.map(step => this.loadData(step))

    return frets
  }
  static loadFretboard = tuning =>
    this.loadTuningFull(tuning).map(open => this.loadSteps(open).map(v => this.loadData(v)))
  static loadChord = note => this.loadNote(note).chord().notes()
  static loadRiff = (note, scale) => Random.arrayShuffles(this.loadScale(note, scale).simple())
  static loadArpeggioNote = note => [note, ...Random.arrayShuffles(this.loadChord(note)), note]
  static loadArpeggio = notes => notes.reduce((acc, note) => [...acc, ...this.loadArpeggioNote(note)], notes)
  static loadArpeggios = notes => Random.arrayShuffles(this.loadArpeggio(notes))
  static loadChord = note => this.loadNote(note).chord().notes()
  static loadInterval = (note, interval) => interval > 0 && interval < 7 && this.loadNote(note).interval(interval)
  static loadIntervals = note => INTERVAL_CHARS.map(interval => this.loadInterval(note, interval))
  static toMidi = note => this.loadNote(note).midi()
  static fromMidi = midi => midi > 0 && midi < 120 && Teoria.note.fromMIDI(midi).toString()
  static loadStep = (note, step = 1) => step > 0 && this.fromMidi(this.toMidi(note) + step)
  static loadSteps = (note, steps = 24) => steps > 0 && Random.array(steps).map((v, i) => this.loadStep(note, i))
  static loadOctaved = note => this.loadStep(note, 12)
  static loadFrets = (note, frets = 24) => [note, ...this.loadSteps(note, frets)].map(this.loadData)
  // Tone.js
  static tonePlayer = url => new Tone.Player({ url })
  static toneSampler = ({ urls, baseUrl }) => new Tone.Sampler({ urls, baseUrl })
  static toneSequence = (note, player, sub = '8n') =>
    new Tone.Sequence((time, data) => player(time, data), this.loadArpeggioNote(note), sub)
  static toneOptions = opt => ({ ...{ size: 2 ** this.number(1, 10), type: 'fft', smoothing: true }, ...opt })
  static toneAnalyser = () => new Tone.Analyser(this.toneOptions())
  static loadSamples = instrument => {
    if (!INSTRUMENTS[instrument]) {
      throw new Error(`Invalid instrument: ${instrument}`)
    }

    return INSTRUMENTS[instrument]
  }
  // Guitar
  static scaleRiff = (note, scale, size = 20) => {
    const repeats = Random.arrayRepeats([note], size).map((v, i) => i > 0 && this.loadStep(v, 12 * Random.number(1, 5)))
    const scales = repeats.map(v => Random.arrayShuffles(this.loadScale(v, scale)))
    const arpeggios = this.loadScale(note, scale).map(v => this.loadChord(v))
    const merged = Random.arrayUnicals([...scales, ...arpeggios])
    const riff = Random.numbers(size, 4, 20)
      .map(v => Random.numbers(v, 3, 20))
      .map(v => Random.values(merged, v))
    const riffs = Random.arrayShuffles(riff)

    return { repeats, scales, arpeggios, merged, riff, riffs }
  }
  static scaleNotes = (note, scale, size = 20) => Random.values(this.loadScale(note, scale), size)
  static noteRiffs = note =>
    Random.arrayUnicals(Random.arrayShuffles(this.loadChord(note), 100).map((v, i, arr) => Random.values(arr, 10)))
  static notesRiffs = notes => notes.reduce((acc, v) => [...acc, ...notes.map(this.noteRiffs(v))])
  static riffRhythm = (notes, size, arr = Random.arrayShuffles(notes, size)) =>
    Random.arrayDoubleSome(Random.arrayShuffles(arr), 50)
  static scaleRiff = (note, scale, size, notes = this.loadScale(note, scale)) => {
    const parts = this.array(size).map((v, i) => i && Random.arrayShuffledUnicals(Random.values(notes, 2 + i)))
    return this.arrayShuffledUnicals(parts)
  }
  static buildFretboard = ({ strings, frets, tuning }) => {
    const tuningNotes = this.loadTuningFull(tuning).filter((v, i) => v && i < strings)

    return tuningNotes.map(note => this.loadFrets(note, frets))
  }
}
export class Random {
  static range = () => Math.random().toFixed(2)
  static boolean = (chance = 50) => this.number(1, 100) > chance
  static number = (min = 1, max = 100) => Math.floor(this.range() * (max - min))
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
  static colorHex = () => Random.arrayElement(COLOR_HEX)
  static colorClassName = () => Random.arrayElement(COLOR_CLASSNAMES)
}
