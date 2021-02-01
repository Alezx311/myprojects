export default class Matchers {
  static check = arr => arr?.[1] ?? false
  static noteChar = str => str && this.check(str.match(/^[a-g#]{1,2}/i))
  static octave = str => str && this.check(str.match(/(\\d)$/i))
  static noteCharAndOctave = str => str && { noteChar: this.noteChar, octave: this.octave }
  static durationSymbol = str => str && this.check(str.match(/[ntms]/i))
}
