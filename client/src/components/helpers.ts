import Teoria from 'teoria';
import { Random } from 'jsuseful';
import { NOTES, DURATION_CHARS } from './constants';

type NoteSound = {
  char: string;
  duration: string;
  velocity: number;
};

export class Note {
  static randomNote(octave: number = Note.randomOctave()): string {
    const note = Random.arrayElement(NOTES);

    return `${note}${octave}`;
  }

  static randomOctave(min: number = 2, max: number = 4): number {
    const octave = Random.number(min, max);

    return octave;
  }

  static loadNote(note: string): any {
    let NoteObject = Teoria.note(note);

    if (!NoteObject.octave()) {
      NoteObject = Teoria.note(`${note}${Note.randomOctave()}`);
    }

    return NoteObject;
  }

  static getScaleNotes(note: string = Note.randomNote(), scale: string): string[] {
    const NoteObject = Note.loadNote(note);
    const scaleNotes = NoteObject.scale(scale).simple();

    return scaleNotes;
  }

  static getRandomNotes(source: string[] = NOTES, size: number = 100): string[] {
    const notes = Random.values(source, size);

    return notes;
  }

  static getMelody(root: string, scale: string, size: number): NoteSound[] {
    const scaleNotes = Note.getScaleNotes(root, scale);
    const melody = Random.arrayValues(scaleNotes, size).map(
      (char: string): NoteSound => {
        const duration = `${Random.arrayElement(DURATION_CHARS)}${Random.powerOfTwo()}`;
        const velocity = Random.range();
        const noteSound = { char, duration, velocity };

        return noteSound;
      },
    );

    const shuffles = Random.arrayShuffles(melody);

    return shuffles;
  }
}
