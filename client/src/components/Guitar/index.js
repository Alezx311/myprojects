import React, { useState } from 'react'
import { Box, Button, Text, RangeInput, DropButton } from 'grommet'
import { GUITAR_TUNINGS, TUNING_NAMES, NOTES, SCALES } from '../constants'
import { Random, Note } from '../helpers'

const Fret = ({ noteChar, ...props }) => {
  return <Button size="small" style={{ fontSize: 10 }} label={noteChar} noteChar={noteChar} {...props} />
}
const String = ({ openNote, frets, onClick }) => {
  return (
    <Box direction="row" gap="xsmall">
      {Random.noteSteps(openNote, frets).map(noteChar => (
        <Fret key={noteChar} noteChar={noteChar} onClick={() => onClick(noteChar)} />
      ))}
    </Box>
  )
}

const InputRange = ({ label, ...props }) => (
  <Box direction="row">
    <Text>{label}: </Text>
    <Text>{props.value}</Text>
    <RangeInput {...props} />
  </Box>
)

const DropSelect = ({ label, value, options, onClick }) => (
  <DropButton
    label={`${label}: ${value}`}
    dropAlign={{ top: 'bottom', right: 'right' }}
    dropContent={options.map(v => (
      <Button key={v} background="light-2" onClick={() => onClick(v)}>
        {v}
      </Button>
    ))}
  />
)

export const Guitar = props => {
  const [strings, setStrings] = useState(6)
  const [frets, setFrets] = useState(12)
  const [tuning, setTuning] = useState(0)
  const [rootNote, setRootNote] = useState('C2')
  const [scale, setScale] = useState('minor')
  const [size, setSize] = useState(20)
  const [riff, setRiff] = useState([])

  const openNotes = Object.values(GUITAR_TUNINGS)[tuning]
  const openNotesStrings = [...openNotes, ...openNotes.map(v => Random.noteStep(v, 12))].filter((v, i) => i < strings)

  const Strings = openNotesStrings
    .reverse()
    .map(openNote => <String key={openNote} openNote={openNote} frets={frets} onClick={setRootNote} />)

  const RiffView = () => {
    const riffString = riff.length ? riff.filter((v, i) => i < 10).join(' -> ') : 'Riff not generated'

    return <Text>{`${riffString}...`}</Text>
  }

  const SetupGuitar = () => (
    <>
      <Box direction="column" gap="small" align="center" justify="center">
        <InputRange
          label="Strings"
          value={strings}
          step={1}
          min={4}
          max={8}
          onChange={({ target }) => setStrings(target.value)}
        />
        <InputRange
          label="Frets"
          value={frets}
          step={3}
          min={12}
          max={27}
          onChange={({ target }) => setFrets(target.value)}
        />
        <InputRange
          label="Tuning"
          value={tuning}
          step={1}
          min={0}
          max={3}
          onChange={({ target }) => setTuning(target.value)}
        />
      </Box>
      <Box direction="column" gap="small" align="center" justify="center">
        <DropSelect label="Root Note" value={rootNote ?? ''} options={NOTES} onClick={v => setRootNote(v)} />
        <DropSelect label="Scale" value={scale ?? ''} options={SCALES} onClick={v => setScale(v)} />
        <DropSelect label="Melody Size" value={size ?? ''} options={[10, 20, 50, 100]} onClick={v => setSize(v)} />
      </Box>
      <Box direction="column" gap="small" align="center" justify="center">
        <Button background="light-2" disabled={!rootNote} onClick={() => setRiff(Note.melody(rootNote, scale, size))}>
          Generate Riff
        </Button>
      </Box>
    </>
  )

  return (
    <Box direction="column" align="center" gap="medium" pad="medium">
      <Box direction="row" gap="large" pad="medium" align="center">
        <SetupGuitar />
      </Box>
      <br />
      <Box direction="row" gap="medium" align="center" justify="center">
        <Box direction="column" gap="xxsmall" pad="small" align="center">
          {Strings}
        </Box>
      </Box>
      <br />
      <Box direction="row" gap="medium" align="center" justify="center">
        <RiffView />
      </Box>
    </Box>
  )
}
