import React, { Component } from 'react'
import { TextButton, Select } from 'react-nexusui'
import { Synth } from '../Sound'
import MusicHelpers from '../Sound/Helpers'

let instrument = null
const randSeqArray = MusicHelpers.rand.sequence([8, 12], 'C2', 'minorpentatonic')

// 'major',
//     'minor',
//     'ionian',
//     'dorian',
//     'phrygian',
//     'lydian',
//     'mixolydian',
//     'aeolian',
//     'locrian',
//     'majorpentatonic',
//     'minorpentatonic',
//     'chromatic',
//     'harmonicchromatic',
//     'blues',
//     'doubleharmonic',
//     'flamenco',
//     'harmonicminor',
//     'melodicminor',
//     'wholetone'
let randMelodySettings = {
  size: [120, 120],
  key: 'B',
  scale: 'phrygian',
  octave: 7
}

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

class NoteLogs extends Component {
  constructor(props) {
    super(props)
    this.randNotesArray = props.randNotesArray
  }

  convertAndPlay(e) {
    const sound = e.target.innerText.split('/')
    if (!instrument) {
      instrument = new Synth()
    }
    instrument.playSound(sound[0], '8n')
  }

  render() {
    return (
      <div className="notelogs">
        <span>Sequence Note Text</span>
        <span>
          {this.randNotesArray.map(seqPart => {
            return <p>{seqPart.map(p => p.note).join(' > ')}</p>
          })}
        </span>
        <div>
          <span>Sequence Note Play</span>
          {this.randNotesArray.map((seqPart, seqIndex) => (
            <div>
              {seqPart.map((pData, pIndex) => {
                const { note, duration } = pData
                return <button onClick={this.convertAndPlay}>{note + '/' + duration}</button>
              })}
            </div>
          ))}
        </div>
        <span className="logs"></span>
      </div>
    )
  }
}
class SetupFretboard extends Component {
  constructor(props) {
    super(props)
    this.frets = 24
    this.strings = 6
  }

  optionsStrings = ['6', '7', '8']
  optionsFrets = ['21', '24', '27']

  onChange(e) {
    console.log('onChange', e)
  }
  handleBuild() {
    console.log('handleBuild')
  }
  handleReset() {
    console.log('handleReset')
  }

  changeRandMelodySettingsKey(v) {
    console.log('changeRandMelodySettingsKey', v)
    randMelodySettings.key = v
  }
  changeRandMelodySettingsScale(v) {
    console.log('changeRandMelodySettingsScale', v)
    randMelodySettings.scale = v
  }
  changeRandMelodySettingsSize_1(e) {
    console.log('changeRandMelodySettingsSize_1', e.target.value)
    randMelodySettings.size[0] = e.target.value
  }
  changeRandMelodySettingsSize_2(e) {
    console.log('changeRandMelodySettingsSize_2', e.target.value)
    randMelodySettings.size[1] = e.target.value
  }
  changeRandMelodySettingsOctave(e) {
    console.log('changeRandMelodySettingsOctave', e.target.value)
    randMelodySettings.octave = e.target.value
  }

  randMelodyCreate(e) {
    if (!instrument) {
      instrument = new Synth()
    }
    console.log('randMelodyCreate', e)
    console.log('randMelodySettings', randMelodySettings)

    const { size, octave, key, scale } = randMelodySettings
    const sequence = instrument.generateSequence(size, `${key}${octave}`, scale)

    console.log('sequence', sequence)
  }
  randMelodyPlay() {
    instrument.playSequence()
  }
  randMelodyPause() {
    instrument.pauseSequence()
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
        <div className="rand_setup">
          <div>
            <span>Выберите размер</span>
            <br />
            <input
              className="rand_size_1"
              type="number"
              min={2}
              max={10}
              step={1}
              onChange={this.changeRandMelodySettingsSize_1}
              defaultValue={8}
              text={8}
            ></input>
            <br />
            <input
              className="rand_size_2"
              type="number"
              min={2}
              max={10}
              step={1}
              onChange={this.changeRandMelodySettingsSize_2}
              defaultValue={12}
              text={12}
            ></input>
            <br />
            <input
              className="rand_octave"
              type="number"
              min={2}
              max={10}
              step={1}
              onChange={this.changeRandMelodySettingsOctave}
              defaultValue={2}
              text={2}
            ></input>
          </div>
          <div>
            <span>Выберите тональность</span>
            <Select
              className="rand_key"
              onChange={this.changeRandMelodySettingsKey}
              options={['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'F', 'E', 'E#', 'G', 'G#']}
            />
          </div>
          <div>
            <span>Выберите палитру</span>
            <br />
            <Select
              className="rand_scale"
              onChange={this.changeRandMelodySettingsScale}
              options={[
                'major',
                'minor',
                'ionian',
                'dorian',
                'phrygian',
                'lydian',
                'mixolydian',
                'aeolian',
                'locrian',
                'majorpentatonic',
                'minorpentatonic',
                'chromatic',
                'harmonicchromatic',
                'blues',
                'doubleharmonic',
                'flamenco',
                'harmonicminor',
                'melodicminor',
                'wholetone'
              ]}
            />
          </div>
        </div>
        <button onClick={this.randMelodyCreate}>Создать</button>
        <button onClick={this.randMelodyPlay}>Играть</button>
        <button onClick={this.randMelodyPause}>Пауза</button>
        <div className="setupButtons">
          <TextButton text="Success" onChange={this.handleSuccess} mode="button" />
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
    if (!instrument) {
      instrument = new Synth()
    }
    instrument.playSound(e.target.innerText, '8n')
  }

  render() {
    return (
      <button className="fret" onClick={this.playSound}>
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

export default class GuitarFretboard extends Component {
  constructor(props) {
    super(props)
    this.notesArray = []
  }
  render() {
    return (
      <div /* onMouseOver={showElAttr} */>
        <span className="classInfo">Fretboard</span>
        <br />
        <SetupFretboard />
        <br />
        {/* <NoteLogs /> */}
        <br />
        <Fretboard strings={6} frets={24} tuning="E Standart" />
        <br />
      </div>
    )
  }
}
