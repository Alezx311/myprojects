import React from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateFretboard } from '../../store/actions'
import { NOTES, TUNINGS, splitNoteAndOctave } from '../MelodyGenerator/Helpers'

const getOptions = arr => arr.map(v => ({ value: v, label: v }))

const optionsString = [4, 5, 6, 7, 8]
const optionsFret = [21, 24, 27]
const optionsTuning = ['E Standart', 'Drop D', 'Drop C', 'Drop B']

const SetupSelectLabel = ({ text }) => <div className="text-center align-middle m-1">{text}</div>

const SetupSelect = ({ text, options }) => {
  const dispatch = useDispatch()
  const name = text.toLowerCase()
  const value = useSelector(state => state.fretboard[name])
  const onChange = option => dispatch(updateFretboard(Object.fromEntries([[name, option.value]])))

  return (
    <div className="col">
      <SetupSelectLabel text={text} />
      <Select value={{ value, label: value }} onChange={onChange} options={getOptions(options)} />
    </div>
  )
}

const FretboardSetup = () => (
  <div className="row">
    <SetupSelect text="Strings" options={optionsString} />
    <SetupSelect text="Frets" options={optionsFret} />
    <SetupSelect text="Tuning" options={optionsTuning} />
  </div>
)
const FretboardTable = () => {
  const { fretboard } = useSelector(state => state)
  const opens = TUNINGS[fretboard.tuning]
  const stringsArray = [...opens, ...opens].map((stringOpenNote, stringIndex) => {
    const { note, octave } = splitNoteAndOctave(stringOpenNote)
    const fretsArray = Array(fretboard.frets)
      .fill(1)
      .map((v, i) => {
        let noteIndex = NOTES.indexOf(note) + i
        let noteOctave = octave
        if (noteIndex > 12) {
          noteIndex = ~~(noteIndex / 12)
          noteOctave = noteIndex % 12
        }
        let noteName = NOTES[noteIndex]
        let noteFull = `${noteName}${noteOctave}`

        return { noteIndex, noteOctave, noteName, noteFull }
      })

    return { stringOpenNote, note, octave, fretsArray }
  })

  const FretCell = ({ noteIndex, noteOctave, noteName, noteFull }) => {
    const onClick = e => {
      console.log('Fret Clicked')
      console.log('noteIndex', noteIndex)
      console.log('noteOctave', noteOctave)
      console.log('noteFull', noteFull)
      console.log('noteName', noteName)
    }
    return (
      <div className="list-group-item text-center" onClick={onClick}>
        {noteFull}
      </div>
    )
  }
  const StringFrets = ({ stringOpenNote, note, octave, fretsArray }) => (
    <div className="list-group list-group-horizontal mx-auto">
      {fretsArray.map((fretValue, fretIndex) => (
        <FretCell key={fretIndex} {...fretValue} />
      ))}
    </div>
  )

  return (
    <div className="row">
      {stringsArray.map((stringValue, stringIndex) => {
        if (stringIndex + 1 > fretboard.strings) {
          return null
        } else {
          return <StringFrets key={stringIndex} {...stringValue} />
        }
      })}
    </div>
  )
}

export const Fretboard = () => (
  <div className="container">
    <FretboardSetup />
    <FretboardTable />
  </div>
)

export default Fretboard
