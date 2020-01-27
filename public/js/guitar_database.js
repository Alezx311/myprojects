let music = {}

music.flScales = {
  major: 'R 2M 3M 4 5 6M 7M',
  harmonic_minor: 'R 2M 3m 4 5 6m 7M',
  melodic_minor_ascending: 'R 2M 3m 4 5 6M 7M',
  melodic_minor_descending: 'R 2M 3m 4 5 6m 7m',
  chromatic: 'R 2m 2M 3m 3M 4 4a 5 6m 6M 7m 7M',
  whole_tone: 'R 2M 3M 4a 6m 7m',
  major_pentatonic: 'R 2M 3M 5 6M',
  minor_pentatonic: 'R 3m 4 5 7m',
  pentatonic_blues: 'R 3m 4 4a 5 7m',
  pentatonic_neutral: 'R 2M 4 5 7m',
  octatonic_h_w: 'R 2m 3m 3M 4a 5 6M 7m',
  octatonic_w_h: 'R 2M 3m 4 4a 6m 6M 7M'
}

music.guitarTunings = {
  standart_freq: {
    '1': 329.63,
    '2': 246.94,
    '3': 196.00,
    '4': 146.83,
    '5': 110.00,
    '6': 82.41
  },
  e_standart: ['E', 'A', 'D', 'G', 'B', 'E'],
  drop_d: ['D', 'A', 'D', 'G', 'B', 'E'],
  eb_standart: ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb']
}

music.progressions = [
  ['I - IV - V'],
  ['I - V - IV'],
  ['IV - V - I'],
  ['ii - V - I'],
  ['ii - vi - V'],
  ['ii - vi - IV - V']
]



music.notesMain = [
  {
    name: 'C',
    fullName: 'C',
    maj: true,
    freqLow: 32.70,
    freqHigh: 4186.00,
    scales: [],
    numQ: 1
  },
  {
    name: 'сd',
    fullName: 'C♯',
    maj: true,
    freqLow: 34.65,
    freqHigh: 4434.80,
    scales: [],
    numQ: 2
  },
  {
    name: 'D',
    fullName: 'D',
    maj: true,
    freqLow: 36.95,
    freqHigh: 4698.40,
    scales: [],
    numQ: 3
  },
  {
    name: 'de',
    fullName: 'D#',
    maj: true,
    freqLow: 38.88,
    freqHigh: 4978.00,
    scales: [],
    numQ: 4
  },
  {
    name: 'E',
    fullName: 'E',
    maj: true,
    freqLow: 20.61,
    freqHigh: 5274.00,
    scales: [],
    numQ: 5
  },
  {
    name: 'F',
    fullName: 'F',
    maj: true,
    freqLow: 21.82,
    freqHigh: 2793.80,
    scales: [],
    numQ: 6
  },
  {
    name: 'fg',
    fullName: 'F♯',
    maj: true,
    freqLow: 23.12,
    freqHigh: 2960.00,
    scales: [],
    numQ: 7
  },
  {
    name: 'G',
    fullName: 'G',
    maj: true,
    freqLow: 24.50,
    freqHigh: 3136.00,
    scales: [],
    numQ: 8
  },
  {
    name: 'ga',
    fullName: 'G#',
    maj: true,
    freqLow: 25.95,
    freqHigh: 3332.40,
    scales: [],
    numQ: 9
  },
  {
    name: 'A',
    fullName: 'A',
    maj: true,
    freqLow: 27.50,
    freqHigh: 3440.00,
    scales: [],
    numQ: 10
  },
  {
    name: 'ab',
    fullName: 'A#',
    maj: true,
    freqLow: 29.13,
    freqHigh: 3729.20,
    scales: [],
    numQ: 11
  },
  {
    name: 'B',
    fullName: 'B',
    maj: true,
    freqLow: 30.87,
    freqHigh: 3951.00,
    scales: [],
    numQ: 12
  },
]