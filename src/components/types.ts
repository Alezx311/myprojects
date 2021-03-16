// export type Key = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
// export type Notation = '#' | 'b' | ''
// export type Octave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// export type MelodySize = 3 | 4 | 5 | 6 | 7 | 8

export type NoteParsed = {
  note: string
  char: string
  octave: number
}
export type NoteSound = {
  note: string
  duration: string
  velocity: number
}
export type Melody = NoteSound[]

export type InitialStates = {
  NOTE_DURATION: string
  NOTE_OCTAVE: number
  NOTE_VELOCITY: number
  MELODY_KEY: string
  MELODY_SCALE: string
  MELODY_SIZE: number
  MELODY_PARTS: number
  GUITAR_STRINGS: number
  GUITAR_FRETS: number
  GUITAR_TUNING: string
  PLAYER_INSTRUMENT: string
  PLAYER_SYNTH: string
  PLAYER_BPM: number
  PLAYER_PLAYBACK_RATE: number
}
