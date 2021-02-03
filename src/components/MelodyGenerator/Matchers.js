const noteCharRegExp = new RegExp('^[a-g#]+', 'i')
const octaveRegExp = new RegExp('[1-6]$', 'i')

export default class Matchers {
  static noteChar = str => noteCharRegExp.exec(str)
  static octave = str => octaveRegExp.exec(str)
}
