let music = {
  notes: [{
      name: 'A',
      next: 'A#',
      prev: 'G#'
    },
    {
      name: 'A#',
      next: 'B',
      prev: 'A'
    },
    {
      name: 'B',
      next: 'C',
      prev: 'A#'
    },
    {
      name: 'C',
      next: 'C#',
      prev: 'B'
    },
    {
      name: 'C#',
      next: 'D',
      prev: 'C'
    },
    {
      name: 'D',
      next: 'D#',
      prev: 'C#'
    },
    {
      name: 'D#',
      next: 'E',
      prev: 'D'
    },
    {
      name: 'E',
      next: 'F',
      prev: 'D#'
    },
    {
      name: 'F',
      next: 'F#',
      prev: 'E'
    },
    {
      name: 'F#',
      next: 'G',
      prev: 'F'
    },
    {
      name: 'G',
      next: 'G#',
      prev: 'F#'
    },
    {
      name: 'G#',
      next: 'A',
      prev: 'G'
    }
  ],
  tunings: {
    standart: ['E', 'A', 'D', 'G', 'B', 'E'],
    dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
  },
  noteStepUp: (note, step) => {
    if (note && step) {
      let nextNote = music.notes.find(key => key.name === note).next
      if (step === 'half') {
        return nextNote
      }
      if (step === 'whole') {
        return music.notes.find(key => key.name === nextNote).next
      } else {
        console.error('Step sIze was not recognozed!')
      }
    } else {
      console.error('Note or step was not recognized!')
    }
  },
  noteStepDown: (note, step) => {
    if (note && step) {
      let prevNote = music.notes.find(key => key.name === note).prev
      if (step === 'half') {
        return prevNote
      }
      if (step === 'whole') {
        return music.notes.find(key => key.name === prevNote).prev
      } else {
        console.error('Step sIze was not recognozed!')
      }
    } else {
      console.error('Note or step was not recognized!')
    }
  },
}
let userGuitarTuning = document.getElementById('selectGuitarTuning')
let userGuitarType = document.getElementById('selectGuitarType')
let buildInstrument = document.getElementById('buildInstrument')

buildInstrument.addEventListener('click', buildGuitarFretboard)

function buildGuitarFretboard() {
  if (document.getElementById('guitarFretboardTable')) return alert('Is exists!')
  let guitarFretboardBlock = document.getElementById('guitarFretboardBlock')
  let table = document.createElement('table')
  table.id = 'guitarFretboardTable'
  let fretboardHead = document.createElement('thead')
  let fretboardBody = document.createElement('tbody')
  let fretboardFooter = document.createElement('tfoot')
  table.appendChild(fretboardHead)
  table.appendChild(fretboardBody)
  table.appendChild(fretboardFooter)
  guitarFretboardBlock.appendChild(table)
  table.className = 'table is-hoverable is-fullwidth'
  for (let string = 0; string < 6; string++) {
    let stringRow = document.createElement('tr')
    stringRow.openStringNote = music.tunings.standart[string]
    stringRow.prevNote = stringRow.openStringNote
    fretboardBody.appendChild(stringRow)
    for (fret = 0; fret < 24; fret++) {
      let fretCell = document.createElement('td')
      if (fret < 1) {
        fretCell.note = stringRow.openStringNote
        fretCell.innerHTML = stringRow.openStringNote
      } else {
        fretCell.note = music.noteStepUp(stringRow.prevNote, 'half')
        fretCell.innerHTML = fretCell.note
        stringRow.prevNote = fretCell.note
      }
      stringRow.appendChild(fretCell)
    }
  }
}

/* window.onload = function () {
  let fretboard = document.getElementById('guitarFretboardBlock')
  fretboard.className = 'modal'
  let fretboardBackground = document.createElement('div')
  fretboardBackground.className = 'modal-background'
  let fretboardStrings = document.createElement('div')
  fretboard.appendChild(fretboardBackground)
  fretboard.appendChild(fretboardStrings)
  for (let stringNumber = 0; stringNumber < 6; stringNumber++) {
    let string = document.createElement('div')
    string.className = 'guitarString tile is-parent is-12'
    string.openStringNote = music.tunings.standart[stringNumber]
    string.lastNote = string.openStringNote
    fretboard.appendChild(string)
    for (fretNumber = 0; fretNumber < 25; fretNumber++) {
      let fret = document.createElement('div')
      fret.className = 'guitarFret tile is-child has-text-centered'
      fret.fretNumber = fretNumber
      if(fretNumber == 0) {
        fret.innerHTML = string.openStringNote
      } else {
        let fretNote = music.noteStepUp(string.lastNote, 'half')
        string.lastNote = fretNote
        fret.innerHTML = fretNote
      }
      string.appendChild(fret)
    }
  }
} */

buildInstrument.addEventListener('click', buildGuitarFretboard())