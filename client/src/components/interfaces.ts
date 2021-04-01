//* Primitives
export type NoteSign = '#' | 'b' | null

export type NoteChar = ('a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g') & NoteSign

export type NoteOctave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

//* For Generate Data
export interface DataNote {
  char: string
  octave: number
  duration: string
  velocity: number
}

export interface DataMelody {
  key: string
  scale: string
  bpm: number
  patternSize: number
  variations: number
  looped: boolean
  maxVoices: number
  sourceText: string | null
}

export interface DataFretboard {
  frets: number
  strings: number
  tuning: string
}

//* Grommet UI Blocks
export interface CustomSelectProps {
  options: string[]
  blockId?: string
  value?: string
  onChange?: (v: string) => void
}

export interface CustomBoxProps {
  direction?: 'row' | 'column' | 'row-responsive' | 'row-reverse' | 'column-reverse' | undefined
  gap?: string
  pad?: string
  children?: JSX.Element | JSX.Element[]
}

export interface CustomTextProps {
  text: string
  label?: string
  size?: number
  onClick?: (v: string) => void
}

export interface CustomButtonProps {
  type?: string
  size?: string
  onClick?: () => void
}

export interface CustomGuitarFretProps {
  note: string
  octave: number
}

export interface CustomMelodyVisualizeProps {
  // функция для соединения
  onStart: () => void
  // при получении новой ноты
  onUpdate?: () => void
  // при клике на ноту
  onNoteClick: () => void
  // при завершении мелодии
  afterShow: () => void
  // при длительном отсутствии данных
  onUndefined: () => void
  // максимум нот на экране
  elementsOnScreen: number
}

export interface CustomMelodySourceTextInputProps {
  placeholder: string
  text?: string
  charsRange?: string[]
  onChange: (value: string) => Promise<void>
}

export interface DataChartNote {
  noteChar: string
  noteOctave: number
  noteIndex: number
  noteDuration: string
  noteVelocity: number
}

export interface CustomMelodyChartProps {
  data: DataChartNote[]
}
