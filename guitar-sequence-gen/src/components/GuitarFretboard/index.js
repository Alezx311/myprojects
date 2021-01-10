import React, { Component } from 'react'
import { TextButton, Sequencer, Select } from 'react-nexusui'
// import SetupFretboard from './Setup'
// import Fret from './Fret'
// import Fretboard from './Fretboard'

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

class Fretboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      testInfo: 'testInfo',
      status: 'process'
    }
  }
  handleChange(val) {
    const string = val.row + 1
    const fret = val.column + 1
    const info = val.state
    console.log('val', val)
    console.log('string', string)
    console.log('fret', fret)
    console.log('info', info)
  }
  handleReady(val) {
    console.log('handleReady', val)

    val.matrix.set.cell(0, 4, 2)
  }
  handleStep() {
    console.log('handleStep')
    console.log(arguments)
  }

  render() {
    return (
      <div>
        <Sequencer
          size={[800, 400]}
          rows={6}
          columns={24}
          mode="button"
          onChange={this.handleChange}
          onReady={this.handleReady}
          onStep={this.handleStep}
        />
      </div>
    )
  }
}

export default function GuitarFretboard() {
  return (
    <div>
      <span className="classInfo">Fretboard</span>
      <SetupFretboard />
      <Fretboard />
    </div>
  )
}
