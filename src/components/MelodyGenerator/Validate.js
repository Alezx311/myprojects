import CONSTANTS from './Constants'
import Joi from 'joi'

const schemaCheck = s => Joi.isSchema(s) && s.validate()
class Validate {
  static Boolean = v => schemaCheck(Joi.boolean(v))
  static String = v => schemaCheck(Joi.string(v))
  static Array = v => schemaCheck(Joi.string(v))
  static Object = v => schemaCheck(Joi.string(v))
  static Range = v => schemaCheck(Joi.number(v).min(0.01).max(0.09))
  static Number = v => schemaCheck(Joi.number(v).min(1).max(100))
  static PowerOfTwo = v => schemaCheck(Joi.number(v).min(1).max(64))
  static Octave = v => schemaCheck(Joi.number(v).min(1).max(6))

  static Note = v => schemaCheck(Joi.string(v).pattern(/^[a-g#]+$/i))
  static NoteAndOctave = v => schemaCheck(Joi.string(v).pattern(/^[a-g#]+[0-9]$/i))
  static NotesArray = v => schemaCheck(Joi.array(v).items(this.Note))
  static TuningName = v => Object.keys(CONSTANTS.TUNINGS).includes(v)
  static ScaleName = v => CONSTANTS.SCALES.includes(v)
  // static DurationSymbol = v => CONSTANTS.DURATION_SYMBOLS.includes(v)
  static DurationSymbol = v => schemaCheck(Joi.string(v).pattern(/^[ntms]$/i))
  static DurationRelative = v => schemaCheck(Joi.string(v).pattern(/^1|2|4|8|16|32|64[nmts]$/i))
  static DurationAbsolute = v => v > 0 && v < 9999
  static InstrumentName = v => CONSTANTS.INSTRUMENT_NAMES.includes(v)
  static SynthName = v => CONSTANTS.SYNTH_NAMES.includes(v)
  static SampleName = v => CONSTANTS.SAMPLE_NAMES.includes(v)
  static SampleNoteNames = v => schemaCheck(Joi.array(v).items(this.Note))
  static Phrase = v => this.NotesArray(v)
  static PhrasesArray = v => schemaCheck(Joi.array(v).items(this.NotesArray))
}

export default Validate
