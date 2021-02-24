const PlayNotesButton = ({ notes, text, synth, ...props }) => {
  const playNotes = () => {
    const sequence = Sound.loadSequence(notes, props)
    Sound.playSequence(sequence, synth)
  }

  return (
    <button onClick={() => playNotes()} {...props}>
      {text}
    </button>
  )
}
const PlayNoteButton = ({ note, synth, ...props }) => {
  return <button onClick={() => Sound.playNote(note, synth)} {...props}></button>
}

const Notes = props => {
  return <div></div>
}
const Melody = props => {
  return <div></div>
}

const Examples = props => {
  return (
    <div className="container">
      <Notes />
      <Melody />
    </div>
  )
}
