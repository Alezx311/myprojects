import React, { Component } from 'react'
import { TextButton, RadioButton, Select } from 'react-nexusui'

class FretboardInstrument extends Component {
  options = []

  onChange(value, index) {}

  render() {
    return (
      <div>
        <Select size="3" options={this.options} selectedIndex="1" onChange={this.onChange} />

        {/* <select>
          <option value="Guitar">Guitar</option>
          <option value="Piano">Piano</option>
          <option value="Drums">Drums</option>
        </select> */}
      </div>
    )
  }
}
class FretboardType extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="Guitar">Acoustic</option>
          <option value="Piano">Electric</option>
        </select>
      </div>
    )
  }
}
class FretboardTuning extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="E Standart">E Standart</option>
          <option value="Drop D">Drop D</option>
          <option value="Drop C">Drop C</option>
          <option value="Drop B">Drop B</option>
          <option value="Drop A">Drop A</option>
        </select>
      </div>
    )
  }
}
class RadioMinorOrMajor extends Component {
  render() {
    return <RadioButton numberOfButtons="2" active="1" />
  }
}
class SequenceKey extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <RadioMinorOrMajor />
      </div>
    )
  }
}
class SequenceLength extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    )
  }
}
class BuildButton extends Component {
  render() {
    return <TextButton text="Build" />
  }
}

export default class Setup extends Component {
  render() {
    return (
      <div className="setup_container">
        <div className="setup_fretboard">
          <FretboardInstrument />
          <FretboardType />
          <FretboardTuning />
        </div>
        <div className="setup_sequence">
          <SequenceKey />
          <SequenceLength />
        </div>
        <div className="setup_buttons">
          <BuildButton />
        </div>
      </div>
    )
  }
}
