import React from 'react'
import * as Tone from 'tone'
// import { Container, Row, Col, Card, Button, ButtonGroup, Alert } from 'react-bootstrap'
import { SYNTHS, NOTES, SCALES, INSTRUMENTS, COLOR_CLASSES } from '../constants'
import { Note, Random } from '../helpers'

const NoteButtons = ({ synth }) => {
  const notes = NOTES.map(char => `${char}4`)
  const randNote = Random.note()
  const duration = '8n'

  const playNote = note => {
    synth.triggerAttackRelease(note, duration, Tone.now())
    console.log(`note played. ${note} ${duration}`)
  }
  const playNotes = (note, size) => {
    const scaleNotes = Note.loadScale(note, 'minor')
    const shuffles = Random.arrayShuffles(scaleNotes)
    const sequenceNotes = Random.values(size, shuffles)
    const sequence = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, '8n', Tone.now(), Math.random())

      console.log(`note played. ${note} ${duration}`)
    }, sequenceNotes).set({ humanize: true, loop: size > 10 })

    Tone.Transport.start(0)
    sequence.start('+1')
  }

  const PlayNote = props => (
    <button type="button" className="btn btn-outline-success m-1 p-1" {...props}>
      {props.note}
    </button>
  )

  return (
    <>
      <div className="btn-group" role="group">
        {notes.map((note, key) => (
          <PlayNote note={note} key={key} onClick={() => playNote(note)} />
        ))}
      </div>

      <div className="btn-group" role="group">
        <PlayNote note={randNote} size={10} onClick={() => playNotes(randNote, 10)} text="Short" />
        <PlayNote note={randNote} size={20} onClick={() => playNotes(randNote, 20)} text="Normal" />
        <PlayNote note={randNote} size={50} onClick={() => playNotes(randNote, 50)} text="Long" />
        <PlayNote note={randNote} size={100} onClick={() => playNotes(randNote, 100)} text="Very Long" />
      </div>
    </>
  )
}

const Synths = props => {
  const synths = SYNTHS.map(name => ({ name, synth: new Tone[name]().toDestination() }))

  return synths.map(({ synth, name }, key) => (
    <div className="card shadow-lg bg-light bg-gradient m-3" key={key}>
      <div className="card-body text-center">
        <h6 className="fw-bold fst-italic">{name}</h6>
        <NoteButtons synth={synth} />
      </div>
    </div>
  ))
}

const Instruments = props => {
  return (
    <div className="container">
      {INSTRUMENTS.map((value, key) => (
        <div key={key} value={value}>
          {value}
        </div>
      ))}
    </div>
  )
}
const Scales = props => {
  return (
    <div className="container">
      {SCALES.map((value, key) => (
        <div key={key} value={value}>
          {value}
        </div>
      ))}
    </div>
  )
}

export const Player = props => {
  return (
    <div className="container fluid">
      <Scales />
      <Synths />
      <Instruments />
    </div>
  )
}

export default Player
