import React from 'react'
import * as Tone from 'tone'
import { Button, Container, Col, Row, ToggleButtonGroup, Card } from 'react-bootstrap'
import { SYNTHS, NOTES, INSTRUMENTS } from '../constants'
import { Note, Random } from '../helpers'

const Notes = props => {
  const playOne = note => {
    const synth = new Tone[props.synthName]().toDestination()
    console.log(note)
    synth.triggerAttackRelease(note, '4n')
  }
  const playMany = note => {
    const synth = new Tone[props.synthName]().toDestination()
    const fm = new Tone.FMSynth().toDestination()
    const drum = new Tone.PluckSynth().toDestination()
    const notes = Note.melody(note)
    console.table(notes)
    new Tone.Sequence((time, str) => {
      synth.triggerAttackRelease(str, '8n', time)
    }, notes)
      .start()
      .set({ humanize: true, playbackRate: 1, probability: 1 })
    // new Tone.Sequence((time, str) => {
    //   fm.triggerAttackRelease(str, '4n', time, 0.1)
    // }, notes)
    //   .start(0)
    //   .set({ humanize: true, playbackRate: 1.3, probability: 1 })

    Tone.Transport.start('0.1')
  }
  return NOTES.map(v => Note.getOctave(v)).map(v => (
    <Row key={v}>
      <Button onClick={() => playOne(v)}>{v}</Button>
      <Button className={`${v}_play_many`} onClick={() => playMany(v)}>{`${v} melody`}</Button>
    </Row>
  ))
}
const Synths = props => {
  return SYNTHS.map((v, i) => (
    <Card key={v + i}>
      <Card.Body>
        <Card.Title>{v}</Card.Title>
        <Notes synthName={v} />
        {/* <Card.Text>
        </Card.Text> */}
      </Card.Body>
    </Card>
  ))
}

export const Player = props => {
  return (
    <Container>
      <Row>
        <Synths />
      </Row>
    </Container>
  )
}
