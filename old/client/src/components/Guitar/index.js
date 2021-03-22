import React from 'react'
import * as Tone from 'tone'
import { GUITAR_TUNINGS, TUNING_NAMES, NOTES, SCALES, SYNTHS, INSTRUMENTS } from '../constants'
import { Random, Note, Sound } from '../helpers'
import { Box, Button, Text, DropButton } from 'grommet'
let synth

const DropSelect = ({ label, value, options, onClick }) => {
  const dropContent = options.map(v => <Button key={v} label={v} onClick={() => onClick(v)} />)
  return (
    <DropButton label={`${label}: ${value}`} dropAlign={{ top: 'bottom', right: 'right' }} dropContent={dropContent} />
  )
}

export const Guitar = props => {
  const { state, reducer } = props

  const opened = GUITAR_TUNINGS[state.tuning]
  const octaved = opened.map(v => Random.noteStep(v, 12))
  const stringNotes = [...opened, ...octaved].filter((v, i) => i < state.strings).reverse()

  const Fretboard = () =>
    stringNotes.map(open => (
      <Box key={open} direction="row" gap="small">
        {Random.noteSteps(open, state.frets).map(note => (
          <Button
            key={note}
            size="small"
            label={note}
            onClick={() => {
              reducer({ rootNote: note })
              synth.triggerAttackRelease(note, '4n')
            }}
          />
        ))}
      </Box>
    ))
  const RiffView = () => (
    <>
      <Text hidden={!state.riff.length}>{state.riff.filter((v, i) => i < 10).join(' -> ')}</Text>
      <Text>{JSON.stringify(state.valueOnPlay, null, '\t')}</Text>
    </>
  )
  const RiffPlay = () => {
    const onPlay = () => {
      const notes = state.riff.map(v => Random.noteValues(v))

      const sequence = new Tone.Sequence((time = Tone.now(), { note, duration, velocity }) => {
        reducer({ valueOnPlay: { note, duration, velocity }, isPlaying: true })

        synth.triggerAttackRelease(note, '4n', time, velocity)
      }, notes).start(1)

      Tone.Transport.set({ bpm: 130, humanize: true, playbackRate: 1.3 })
      Tone.Transport.start('+0.1')
    }
    const onStop = () => {
      Tone.Transport.stop(0)

      reducer({ isPlaying: false })
    }

    return (
      <>
        <Button disabled={state.isPlaying} label="Play" onClick={onPlay} />
        <Button disabled={!state.isPlaying} label="Stop" onClick={onStop} />
      </>
    )
  }

  const SetupFretboard = () => (
    <>
      <DropSelect
        label="Strings"
        value={state.strings}
        options={[4, 5, 6, 7, 8]}
        onClick={v => reducer({ strings: v })}
      />
      <DropSelect label="Frets" value={state.frets} options={[12, 21, 24]} onClick={v => reducer({ frets: v })} />
      <DropSelect label="Tuning" value={state.tuning} options={TUNING_NAMES} onClick={v => reducer({ tuning: v })} />
    </>
  )
  const SetupRiff = () => (
    <>
      <DropSelect label="Root Note" value={state.rootNote} options={NOTES} onClick={v => reducer({ rootNote: v })} />
      <DropSelect label="Scale" value={state.scale} options={SCALES} onClick={v => reducer({ scale: v })} />
      <DropSelect
        label="Melody Size"
        value={state.size}
        options={[10, 20, 50, 100]}
        onClick={v => reducer({ size: v })}
      />
      <DropSelect
        label="Sound Instrument"
        value={state.instrumentName}
        options={Object.keys(INSTRUMENTS)}
        onClick={v => {
          const urlEntries = Object.entries(INSTRUMENTS[v]).map(([key, val]) => [key, `/samples/${v}/${val}`])
          const samples = Object.fromEntries(urlEntries)

          synth = new Tone.Sampler(samples).toDestination()

          reducer({ synthName: null, instrumentName: v })
        }}
      />
      {/* <DropSelect
        label="Sound Synth"
        value={state.synthName}
        options={SYNTHS}
        onClick={v => {
          reducer({ synthName: v })
          updateSynth()
        }}
      /> */}
    </>
  )
  const SetupButtons = () => (
    <>
      <Button
        disabled={!state.rootNote}
        label="Generate Riff"
        onClick={() => {
          const { rootNote, scale, size } = state
          const riff = Note.melody(rootNote, scale, size)

          reducer({ riff })
        }}
      />
    </>
  )
  const SetupGuitar = () => (
    <Box direction="row" align="center" gap="medium">
      <SetupFretboard />
      <SetupRiff />
      <SetupButtons />
    </Box>
  )
  return (
    <Box direction="column" align="center" gap="medium">
      <SetupGuitar />
      <Fretboard />
      <RiffView />
      <RiffPlay />
    </Box>
  )
}
