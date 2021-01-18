import React, { Component } from 'react'
import { TextButton, Select } from 'react-nexusui'

const initialState = {
  fretboard: {
    string: '6',
    tuning: 'E Standart',
    frets: '21'
  }
}

// TODO Страница управления
// Настройка генератора грифа гитары
class FretboardSetup {
  constructor(props) {
    super(props)
    this.state = { ...initialState.fretboard }
  }

  handleButtonReset() {
    this.setState({ ...initialState.fretboard })
  }
  handleButtonCreate() {
    Fretboard.create(this.state)
  }

  return() {
    return (
      <div>
        <p>Fretboard Setup</p>
        <Select
          className="setup_string"
          options={['6', '7', '8']}
          onChange={val => this.setState({ string: val })}
          selectedIndex={0}
        />
        <Select
          className="setup_tuning"
          options={['E Standart', 'Drop D', 'Drop C']}
          onChange={val => this.setState({ tuning: val })}
          selectedIndex={0}
        />
        <Select
          className="setup_frets"
          options={['21', '24', '27']}
          onChange={val => this.setState({ frets: val })}
          selectedIndex={0}
        />
        <div>
          <TextButton text="Start" onClick={this.handleButtonCreate} />
          <TextButton text="Reset" onClick={this.handleButtonReset} />
        </div>
      </div>
    )
  }
}
class Fret {
  constructor(props) {
    super(props)
    this.state = {
      note: props?.note ?? false,
      toggle: props?.toggle ?? false,
      fretIndex: props?.fretIndex ?? false
    }
  }

  handleClick() {
    const invertedToggle = !this.state.toggle
    this.setState({ toggle: invertedToggle })
  }

  return() {
    return (
      <div note={this.state.note} toggle={this.state.toggle} onClick={this.handleClick}>
        {this.state.note}
      </div>
    )
  }
}
class FretString {
  constructor(props) {
    super(props)
    this.state = {
      frets: props?.frets ?? false,
      startNote: props?.startNote ?? false
    }
  }

  getValues(startNoteAndOctaveValue, steps) {
    const getNoteAndOctave = str => ({ note: str.match(/[a-g#]+/i)[1], octave: str.match(/\d+/i)[1] })
    const changeNoteAndOctave = (noteObj, steps) => ({ octave:})
    const arr = Array(steps)
      .fill(startNoteAndOctaveValue)
      .map((val, ind) => getFretValue(val, ind))
  }

  return() {
    return (
      <div note={this.state.note} toggle={this.state.toggle} onClick={this.handleClick}>
        {this.state.note}
      </div>
    )
  }
}
// Отображение грифа гитары
class Fretboard {
  constructor(props) {
    super(props)
    this.state = {
      strings: props?.strings,
      frets: props?.frets,
      tuning: props?.tuning
    }
  }

  return() {
    return (
      <div>
        <p>Fretboard</p>
      </div>
    )
  }
}
// Настройка генератора звука
const SoundSetup = () => {
  // Выбор инструмента
  const InstrumentSelect = () => {}
  // Тип гитары (електро, акустика, бас)
  const GuitarTypeSelect = () => {}
  // Тональность
  const MelodyKeySelect = () => {}
  // Гамма
  const MelodyScaleSelect = () => {}
  // Размер такта
  const MelodyPatternSizeSlider = () => {}
  // Количество тактов
  const MelodySequenceSizeSlider = () => {}
}
// Настройка звучания звука
const SoundControls = () => {
  // Громкость
  const VolumeSlider = () => {}
  // Дополнительные еффекты
  const EffectsRadioButtons = () => {}
  // Пауза
  const PauseButton = () => {}
  // Начать проигрывание
  const PlayButton = () => {}
  // Сгенерировать и сыграть
  const GenerateMelodyAndPlayButton = () => {}
  // Сгенерировать и показать мелодию
  const GenerateMelodyAndViewButton = () => {}
  // Сбросить настройки
  const ResetSettingsButton = () => {}
  // Включить отрисовку мелодии на холсте
  const ToggleCanvasButton = () => {}
}
// Логи и текстовая информация
const LogsView = () => {
  // Для разработки
  const DebugLogs = () => {}
  // Для показа мелодии
  const MelodyLogs = () => {}
}
const TestComponent = () => {
  const opt = {
    text: 'Just Test Component',
    class: 'test_component',
    onClick: e => console.log(e.target.innerText)
  }

  return (
    <div className={opt.class} onClick={opt.onClick}>
      {opt.text}
    </div>
  )
}

const GuitarFretboard = () => {
  return (
    <div>
      <TestComponent />
    </div>
  )
}

export default GuitarFretboard
