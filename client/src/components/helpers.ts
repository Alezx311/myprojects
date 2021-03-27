import Teoria from 'teoria';
import { Random } from 'jsuseful';
import { NOTES, DURATION_CHARS, SCALES } from './constants';

type NoteSound = {
  char: string;
  duration: string;
  velocity: number;
};
export type MelodyOptions = {
  key: string;
  scale?: string;
  bpm?: number;
  size?: [number, number];
};

export class Note {
  static randomNote(octave: number = Note.randomOctave()): string {
    const note = Random.arrayElement(NOTES);

    return `${note}${octave}`;
  }

  static randomScale(): string {
    const scaleName = Random.arrayElement(SCALES);

    return scaleName;
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

export async function generateMelody(opt: MelodyOptions) {
  const defaults = {
    scale: Note.randomScale(),
    bpm: Random.number(60, 180),
    size: [Random.number(3, 5), Random.number(3, 5)],
  };
  // TODO Set the BPM (beats per minute)
  const { key, scale, bpm, size } = { ...defaults, ...opt };
  // TODO Create main chords and chord progressions
  const mainChords = Note.getScaleNotes(key, scale);
  const mainProgression = Random.arrayValues(mainChords, size[0]);
  const progressions = Array(size[1])
    .fill(mainProgression)
    .map(v => Random.arrayShuffles(v));

  // TODO Add the main melody

  const melody = Array(size[0]).fill(key).map(v => {
    return Random.arrayElement(mainChords)
  })
  // TODO Include the drums
  // TODO Bring in the bass
  // TODO Put in the finishing touches
}
