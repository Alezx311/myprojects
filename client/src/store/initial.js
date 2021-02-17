export const melodyState = {
  key: 'C',
  scale: 'minor',
  size: '20',
  patterns: '4',
  instrument: 'guitar'
}
export const guitarState = {
  strings: 6,
  frets: 24,
  tuning: 'Drop D',
  sound: 'guitar-acoustic'
}

export const initialState = {
  melody: melodyState,
  guitar: guitarState
}

export default initialState
