import Joi from 'joi'
export default class Validate {
  static Boolean = v => Joi.boolean().validate(v)?.error ?? true
  static String = v => Joi.string().validate(v)?.error ?? true
  static Array = v => Joi.array().validate(v)?.error ?? true
  static Object = v => Joi.object().validate(v)?.error ?? true
  static Range = v => Joi.number().min(0.01).max(0.99).validate(v)?.error ?? true
  static Number = v => Joi.number().min(1).max(100).validate(v)?.error ?? true
  static PowerOfTwo = v => Joi.number().min(1).max(64).validate(v)?.error ?? true
  static Octave = v => Joi.number().min(1).max(6).validate(v)?.error ?? true
  static NoteChar = v =>
    Joi.string()
      .min(1)
      .max(2)
      .pattern(/^[a-g#]+$/i)
      .validate(v)?.error ?? true
  static NoteCharAndOctave = v =>
    Joi.string()
      .min(2)
      .max(3)
      .pattern(/^[a-g#]+[1-6]$/i)
      .validate(v)?.error ?? true
  static NotesArray = v => Joi.array().items(this.NoteChar).validate(v)?.error ?? true
  static DurationSymbol = v =>
    Joi.string()
      .pattern(/^[ntms]$/i)
      .validate(v)?.error ?? true
  static DurationRelative = v =>
    Joi.string()
      .pattern(/^1|2|4|8|16|32|64[nmts]$/i)
      .validate(v)?.error ?? true
  static DurationAbsolute = v => Joi.number().min(0.001).max(10000).validate(v)?.error ?? true
}
