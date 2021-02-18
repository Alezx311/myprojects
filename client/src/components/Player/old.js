import * as Tone from 'tone'
import { Note, Random } from '../helpers'
import { NOTES, INSTRUMENTS, SYNTHS } from '../constants'

const Info = props => {
  return (
    <div className="row justify-content-md-center text-center">
      <div {...props} className="card">
        <div className="card-body text-center">
          <div className="row card-title">
            <span className="title">Sounds Info</span>
            <span className="subtitle">Notes: {NOTES.join(' -> ')}</span>
          </div>
          <div className="row card-text">
            <span className="title">Log: </span>
          </div>
          <div className="row card-text">
            <div className="col">
              <div className="row text-center">
                <span className="subtitle">Synths: </span>
              </div>
              {SYNTHS.map((v, key) => (
                <div key={key} className="row text-center">
                  <span className="subtitle">{v}</span>
                </div>
              ))}
            </div>
            <div className="col">
              <div className="row text-center">
                <span className="subtitle">Instruments: </span>
              </div>
              {INSTRUMENTS.map((v, key) => (
                <div key={key} className="row text-center">
                  <span className="subtitle">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const SynthExamples = props => {
  let logMessage = `${new Date(Date.now()).toUTCString()}: `
  let logBlock = document.getElementById(`show_logs_block`) ?? false
  const notes = NOTES.map(char => `${char}4`)

  return SYNTHS.map((name, key) => {
    const synth = new Tone[name]().toDestination()
    const onClick = ({ note }) => {
      synth.triggerAttackRelease(note, '4n', Tone.now())

      if (!logBlock) {
        logBlock = document.getElementById(`show_logs_block`) ?? false
      }
      // logBlock.color = Random.color()
      // logBlock.style = '{{ background-color: {Random.color()}}}'
      logMessage += ` -> ${note}`
    }

    const playSeq = (size = 20) => {
      const randNote = Random.arrayElement(notes)
      const chordNotes = Note.loadChord(randNote)
      const scaleNotes = Note.loadScale(randNote, 'minor')
      const notesArray = notes
        .reduce((acc, v) => [...acc, ...Random.arrayShuffle(scaleNotes)], scaleNotes)
        .map(v => `${v}4`)
      const seqNotes = Random.values(notesArray, size)

      if (logBlock) {
        logBlock.innerText += `\n\n\nrandNote: ${randNote} scaleNotes: ${scaleNotes} notesArray: ${notesArray}  seqNotes: ${seqNotes}`
      } else {
        logBlock = document.getElementById(`show_logs_block`) ?? false
      }

      const seq = new Tone.Sequence((time, note) => {
        console.log(`Time: ${time} Note: ${note}`)

        synth.triggerAttackRelease(note, '8n', Tone.now(), Math.random())
        // synth.triggerAttackRelease(note, '8n', time)

        // synth.triggerAttackRelease(note, '8n', Tone.now())
      }, seqNotes).set({
        humanize: true,
        probability: 1,
        playbackRate: 1
      })

      Tone.Transport.start(0)
      seq.start('+1')

      return seq
    }

    return (
      <div className="card" key={key}>
        <div className="card-body">
          <div className="row text-center mx-1">
            <div className="card-title">{name}</div>
          </div>
          <div className="col btn-group">
            <button className="btn btn-outline-primary" onClick={() => playSeq(10)}>
              Short
            </button>
            <button className="btn btn-outline-warning" onClick={() => playSeq(50)}>
              Medium
            </button>
            <button className="btn btn-outline-danger" onClick={() => playSeq(100)}>
              Long
            </button>
          </div>
          <div className="row">
            <div className="card-text btn-group">
              {notes.map((note, key2) => (
                <button
                  key={key2}
                  note={note}
                  {...props}
                  name={name}
                  onClick={() => onClick({ note })}
                  synth={synth}
                  className="btn btn-outline-success"
                >
                  {note}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  })
}
const InstrumentExamples = props => {
  let logMessage = `${new Date(Date.now()).toUTCString()}: `
  let logBlock = document.getElementById(`show_logs_block`) ?? false
  const notes = NOTES.map(char => `${char}4`)

  return (
    <div className="col justify-content-md-center text-center">
      {INSTRUMENTS.map((name, key) => (
        <div className="row" key={key}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="card-title">{name}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Player = props => {
  return (
    <div className="container">
      <div className="row">
        <Info />
      </div>
      <div className="row title text-center">
        <div id="show_logs_block">Log</div>
      </div>

      <div className="row">
        <div className="col">
          <SynthExamples />
        </div>
        <div className="col">
          <InstrumentExamples />
        </div>
      </div>
    </div>
  )
}

export default Player
