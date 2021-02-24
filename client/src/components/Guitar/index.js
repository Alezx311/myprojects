import { TUNINGS } from '../constants'
import {Note} from '../helpers'

const Fret = ({ note }) => <div className="note" note={note}>{note}</div>
const String = ({ openNote, frets }) => {
  return <div className="row">{Array(frets).fill(openNote).map((v, i) => <Fret note={Note.loadSteps(v, i)}/>)}</div>
}
export const Guitar = props => {
  const { frets, strings, tuning } = props
  const opened = TUNINGS[tuning]
  const openNotes = opened.split(',')
  const openNotesOctaved = openNotes.map(note => Note.loadSteps(note, 12))
  const stringNotes = [...openNotes, ...openNotesOctaved]
  
  return <div className='container'>
    {Array(strings).fill(1).map((v, i) => <String open={stringNotes[i]} frets={frets}/>)}
  </div>
}

