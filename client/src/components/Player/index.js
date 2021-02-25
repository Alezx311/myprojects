import React from 'react'
import * as Tone from 'tone'
import { SYNTHS, NOTES, INSTRUMENTS } from '../constants'
import { Note, Random } from '../helpers'



const SoundExampleButtons = props => {
  const { synth, synthName } = props

  const play = (note, duration = '4n', time = Tone.now(), velocity = Math.random()) => {
    if (!note) return false
    synth.triggerAttackRelease(note, duration, time, velocity)
  }
  const playMany = (time, note) => play(note, '4n', time)
  const Button = props => <button className="btn btn-primary" {...props}></button>
  const ButtonExampleNote = props => {
    const { note } = props
    const onClick = () => play(note)

    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }
  const ButtonExampleChord = props => {
    const { note } = props
    const onClick = note => {
      const chordNotes = Note.loadChord(note)
      const chordTrack = new Tone.Part(playMany, chordNotes)

      Tone.Transport.start('+1')
    }
    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }
  const ButtonExampleMelody = props => {
    const { note } = props
    const onClick = note => {
      const scaleNotes = Note.loadScale(note)
      const melodyNotes = Random.values(scaleNotes, 20)
      const melodyTrack = new Tone.Sequence(playMany, melodyNotes)

      Tone.Transport.start('+1')
    }
    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }

  return (
    <div className="btn-group">
      {NOTES.map(noteChar => `${noteChar}4`).map(note => (
        <div key={note}>
          <ButtonExampleNote note={note} />
          <ButtonExampleChord note={note} />
          <ButtonExampleMelody note={note} />
        </div>
      ))}
    </div>
  )
}
