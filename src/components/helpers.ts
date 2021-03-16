// import * as Tone from 'tone'
import Teoria from 'teoria'
import Useful from 'jsuseful'
import { NOTES, SYNTH_NAMES, INSTRUMENT_NAMES, INITIAL_STATES } from './constants'
import { NoteParsed, NoteSound } from './types'
import { Random } from 'jsuseful'
import { Constants } from 'jsuseful'

export class Console {
  static error(error: Error, message?: string, returnValue?: any): any {
    console.error(message)
    console.error(error?.message)
    console.trace(error)

    return returnValue
  }
}

export class GuitarHelpers {
  static createNotesSequenceVariations(notesSequence: string[]): string[] {
    if (!notesSequence) return []

    const variations = Random.array(notesSequence.length, () => Random.arrayShuffle(notesSequence))

    if (!variations) return []

    const unicalVariations = Random.arrayUnical(variations)

    return unicalVariations
  }

  static createTabulatureVariations(tabulature: string): string[] {
    if (!tabulature) return []

    const tabulatureNotes = tabulature.match(/([a-g#0-9]+)/g)

    if (!tabulatureNotes) return []

    const tabulatureNotesShuffled = this.createNotesSequenceVariations(tabulatureNotes)

    return tabulatureNotesShuffled
  }
}

export class Sound {
  static parseChar(noteString: string): string {
    try {
      const result = noteString?.trim()?.match(/^([a-g#]{1,2})/i)?.[1] ?? ''

      return result
    } catch (error) {
      return Console.error(error, `Note Char not finded in ${noteString}`)
    }
  }

  static parseOctave(noteString: string): number {
    try {
      const result = noteString?.trim()?.match(/(\d)$/i)?.[1] ?? 0

      return Number(result)
    } catch (error) {
      return Console.error(error, `Octave not finded in ${noteString}`, 0)
    }
  }

  static parseNote(noteString: string, defaultOctave: number = INITIAL_STATES.NOTE_OCTAVE): NoteParsed {
    try {
      const char = this.parseChar(noteString)

      if (!char || char.length < 1) {
        throw new Error(`Invalid char`)
      }

      const octave = this.parseOctave(noteString)

      if (!octave || octave < 1) {
        return { note: `${char}${defaultOctave}`, char, octave: defaultOctave }
      }

      return { note: `${char}${octave}`, char, octave }
    } catch (error) {
      return Console.error(error, `Invalid note to parse: ${noteString}`)
    }
  }

  static noteIndex(note: string): number {
    try {
      const char = this.parseChar(note)

      if (!char || char.length < 1) {
        throw new Error(`Invalid note`)
      }

      const index = NOTES.indexOf(char)

      if (index < 0) {
        throw new Error(`Invalid note`)
      }

      return Number(index)
    } catch (error) {
      return Console.error(error, `noteIndex`)
    }
  }

  static isPlayable(str: string): boolean {
    const playable = !!(this.parseChar(str) && this.parseOctave(str))

    return playable
  }

  static isSynth(name: string): boolean {
    try {
      const result = SYNTH_NAMES.includes(name)

      return result
    } catch (error) {
      return Console.error(error, `Error on checking synth name`, false)
    }
  }

  static isInstrument(name: string): boolean {
    try {
      const result = INSTRUMENT_NAMES.includes(name)

      return result
    } catch (error) {
      return Console.error(error, `Error on checking instrument name`, false)
    }
  }

  static loadNote(str: string) {
    try {
      const { note } = this.parseNote(str)
      const TeoriaNote = Teoria.note(note)

      return TeoriaNote
    } catch (error) {
      return Console.error(error, `Error on loadNote`, false)
    }
  }

  static loadScale(key: string, scaleName: string = INITIAL_STATES.MELODY_SCALE): string[] {
    try {
      const { note } = this.parseNote(key)
      const TeoriaNote = this.loadNote(note)
      const scaleNotes = TeoriaNote.scale(scaleName).simple()

      if (!scaleNotes || scaleNotes.length < 1) {
        throw new Error(`Invalid scaleNotes`)
      }

      return scaleNotes
    } catch (error) {
      return Console.error(error, `Error on setting scale notes`)
    }
  }

  static loadMelody(key: string, scaleName: string, size: number, parts: number): string[] {
    try {
      const scaleNotes = this.loadScale(key, scaleName)

      if (!scaleNotes || scaleNotes.length < 1) {
        throw new Error(`Invalid scaleNotes for ${key} and ${scaleName}`)
      }

      const melodyPart: string[] = Useful.Random.values(scaleNotes, size)

      if (!melodyPart || melodyPart.length < 1) {
        throw new Error(`Invalid melodyPart for ${key} and ${scaleName} and ${size}`)
      }

      const melody: string[] = Useful.Random.array(parts, melodyPart).reduce(
        (acc: string[], val: string[]): string[] => acc.concat(val),
        []
      )

      if (!melody || melody.length < 1) {
        throw new Error(`Invalid melody`)
      }

      return melody
    } catch (error) {
      return Console.error(error, error?.message)
    }
  }

  static loadSteps(note: string, steps: number = 1): string {
    try {
      let { char, octave } = this.parseNote(note)

      if (!char || !octave) {
        throw new Error('Invalid note')
      }

      let noteIndex = this.noteIndex(char)
      let newIndex = noteIndex + steps
      let maxIndex = NOTES.length

      if (newIndex === maxIndex) {
        octave = octave + 1
        newIndex = 0
      } else if (newIndex > maxIndex) {
        octave = octave + Math.floor(newIndex / maxIndex)
        newIndex = newIndex % maxIndex
      }

      const stepNote = NOTES[newIndex]

      if (!stepNote || !stepNote.length) {
        throw new Error(`Invalid arguments`)
      }

      return `${stepNote}${octave}`
    } catch (error) {
      return Console.error(error, `Error on loading step`)
    }
  }

  static loadStepsArray(note: string, size: number = 24, steps: number = 1): string[] {
    try {
      const stepsArray = Useful.Random.array(size, note).map((v: string, i: number) => this.loadSteps(v, i + steps))

      return stepsArray
    } catch (error) {
      return Console.error(error, `Error on loading steps array`)
    }
  }

  static prepareNoteForPlay(note: string): NoteSound {
    const duration = `${Random.arrayElement(Constants.DURATION_CHARS)}${Random.powerOfTwo(1, 4)}`
    const velocity = Random.range()

    return { note, duration, velocity }
  }
}
