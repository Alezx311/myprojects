import React from 'react'
import * as Tone from 'tone'
import { SYNTHS, NOTES, INSTRUMENTS } from '../constants'
import { Note, Random } from '../helpers'

const NoteButtons = ({ synth }) => {
  const NoteButton = ({ note }, ...props) => (
    <button
      type="button"
      note={note}
      className="btn btn-sm btn-outline-success m-1"
      onClick={() => {
        synth.triggerAttackRelease(note, '8n', Tone.now())
      }}
    >
      {note ?? 'Play'}
    </button>
  )

  const MelodyButton = props => {
    const size = props?.size ?? 20
    const octave = props?.octave ?? 4
    const tonical = `${Random.note()}4`
    const scaleNotes = Note.loadScale(tonical).map(char => `${char}${octave}`)
    const melodyNotes = Random.arrayShuffles(scaleNotes)
    const sequenceNotes = Random.notes(size, melodyNotes)

    const sequence = new Tone.Sequence((time = Tone.now(), note) => {
      synth.triggerAttackRelease(note, '8n', time, Math.random())
    }, sequenceNotes).set({ humanize: true, probability: 1, playbackRate: 1 })

    const onClick = () => {
      Tone.Transport.start(0)
      sequence.start('+1')
    }

    return (
      <button type="button" className="btn btn-sm btn-outline-success m-1" onClick={onClick}>
        {`${size} notes melody`}
      </button>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="btn-group" role="group">
          {NOTES.map(char => `${char}4`).map((note, key) => (
            <NoteButton note={note} key={key} />
          ))}
        </div>
      </div>
      <div className="row">
        <MelodyButton size={10} />
        <MelodyButton size={20} />
        <MelodyButton size={50} />
      </div>
    </div>
  )
}

const Synths = props => {
  const synths = SYNTHS.map(name => ({ name, synth: new Tone[name]().toDestination() }))

  return synths.map(({ synth, name }, key) => (
    <div className="card shadow-lg bg-light bg-gradient m-3" key={key}>
      <div className="card-body text-center">
        <h6 className="fw-bold fst-italic">{name}</h6>
        <div className="row">
          <NoteButtons synth={synth} />
        </div>
      </div>
    </div>
  ))
}

const Instruments = props => {
  return (
    <div className="container">
      {Object.keys(INSTRUMENTS).map((value, key) => (
        <div key={key} value={value}>
          {value}
        </div>
      ))}
    </div>
  )
}

export const Player = props => {
  return (
    <div className="container container-fluid">
      <Synths />
      <Instruments />
    </div>
  )
}

export default Player
