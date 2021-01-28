import * as Teoria from 'teoria'

export const Note = (note = '') => Teoria.note(note)
export const Scale = (note, scale) => Teoria.note(note).scale(scale).simple()
