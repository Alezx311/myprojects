import React, { Component } from 'react'
import { TextButton, Select } from 'react-nexusui'
import * as Tone from 'tone'
// import * as SampleLibrary from 'tonejs-instruments'
const tuningsObj = {
  'E Standart': [
    { note: 'E', octave: '2' },
    { note: 'A', octave: '2' },
    { note: 'D', octave: '3' },
    { note: 'G', octave: '3' },
    { note: 'B', octave: '3' },
    { note: 'E', octave: '4' }
  ],
  'Drop D': [
    { note: 'D', octave: '2' },
    { note: 'A', octave: '2' },
    { note: 'D', octave: '3' },
    { note: 'G', octave: '3' },
    { note: 'B', octave: '3' },
    { note: 'E', octave: '4' }
  ],
  'Drop C': [
    { note: 'C', octave: '2' },
    { note: 'G', octave: '2' },
    { note: 'C', octave: '3' },
    { note: 'F', octave: '3' },
    { note: 'G', octave: '3' },
    { note: 'C', octave: '4' }
  ]
}
const notesArr = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']

let synth = new Tone.MembraneSynth().toMaster()
class SetupFretboard extends Component {
  optionsStrings = ['6', '7', '8']
  optionsFrets = ['21', '24', '27']

  changeStrings(value, index) {
    console.log('changeStrings', value, index)
  }
  changeFrets(value, index) {
    console.log('changeFrets', value, index)
  }
  handleBuild() {
    console.log('handleBuild')
  }
  handleReset() {
    console.log('handleReset')
  }

  render() {
    return (
      <div className="setupFretboard">
        <span className="classInfo">SetupFretboard</span>
        <div className="classSelect">
          <span>Strings</span>
          <Select className="selectStrings" options={this.optionsStrings} onChange={this.changeStrings} />
        </div>
        <div className="classSelect">
          <span>Frets</span>
          <Select className="selectFrets" options={this.optionsFrets} onChange={this.changeFrets} />
        </div>
        <div className="setupButtons">
          <TextButton text="Success" onChange={this.handleSuccess} mode="impulse" />
          <TextButton text="Error" onChange={this.handleError} mode="button" />
        </div>
      </div>
    )
  }
}

class Fret extends Component {
  constructor(props) {
    super(props)
    this.noteIndex = props?.noteIndex ?? 'Unknown noteIndex'
    this.name = props?.name ?? 'Unknown name'
    this.octave = props?.octave ?? 'Unknown octave'
    this.info = props?.info ?? 'Unknown info'
  }

  playSound(e) {
    console.log(`Fret ${e.target.innerText} clicked!`)
    console.log(e.target)
    synth.triggerAttackRelease(e.target.innerText, '8n')
  }

  render() {
    return (
      <button
        className="fret"
        name={this.name}
        noteIndex={this.noteIndex}
        octave={this.octave}
        info={this.info}
        onClick={this.playSound}
      >
        {this.info}
      </button>
    )
  }
}
class String extends Component {
  constructor(props) {
    super(props)
    this.fretsLength = props.frets
    this.stringIndex = props.stringIndex
    this.startNote = props.startNote
    this.startOctave = props.startOctave
    this.startNoteIndex = notesArr.indexOf(props.startNote)
  }

  render() {
    const fretsArray = Array(this.fretsLength).fill(1)
    return (
      <div className="string" stringIndex={this.stringIndex}>
        {fretsArray.map((elValue, elIndex) => {
          let noteIndex = this.startNoteIndex + elIndex
          let octave = this.startOctave
          if (noteIndex >= 12) {
            octave = +this.startOctave + Math.floor(noteIndex / 12)
            noteIndex = Math.floor(noteIndex % 12)
          }
          let name = notesArr[noteIndex]
          let info = `${name}${octave}`

          return <Fret noteIndex={noteIndex} octave={octave} name={name} info={info} />
        })}
      </div>
    )
  }
}
class Fretboard extends Component {
  constructor(props) {
    super(props)
    this.strings = props?.strings ?? 6
    this.frets = props?.frets ?? 24
    this.tuning = props?.tuning ?? 'E Standart'
  }

  render() {
    const tuning = tuningsObj?.[this.tuning] ?? tuningsObj['E Standart']
    const stringsArr = Array(this.strings).fill(1)

    return (
      <div className="fretboard">
        {stringsArr.map((v, i) => {
          const { note, octave } = tuning[i]
          return <String stringIndex={i} startNote={note} startOctave={octave} frets={this.frets} />
        })}
      </div>
    )
  }
}

export default function GuitarFretboard() {
  return (
    <div>
      <span className="classInfo">Fretboard</span>
      <SetupFretboard />
      <Fretboard strings={6} frets={24} tuning="E Standart" onReady={() => synth.toMaster()} />
    </div>
  )
}
