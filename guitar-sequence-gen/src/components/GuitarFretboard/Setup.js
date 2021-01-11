import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { TextButton, Slider, Select } from 'react-nexusui'

const DEFAULTS = {
  selectSize: [10, 20],
  sliderSize: [10, 20]
}

const SelectInstrument = () => {
  const options = ['piano', 'guitar']
  const label = 'Выберите инструмент'
  const handleChange = (value, index) => {}

  return <Select size={DEFAULTS.selectSize} value={label} options={options} onChange={handleChange} />
}
const SelectGuitarTuning = () => {
  const options = ['E Standart', 'Drop D', 'Drop C', 'Drop B']
  const label = 'Выберите тюнинг для гитары'

  return <Select size={DEFAULTS.selectSize} value={label} options={options} onChange={handleChange} />
}
const SelectKey = () => {
  const options = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  const label = 'Выберите тональность'

  return <Select size={DEFAULTS.selectSize} value={label} options={options} onChange={handleChange} />
}
const SelectStartOctave = () => {
  const options = ['2', '3', '4', '5', '6']
  const label = 'Выберите начальную октаву'

  return <Select size={DEFAULTS.selectSize} value={label} options={options} onChange={handleChange} />
}
const SelectScale = () => {
  const options = [
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
  ]
  const label = 'Выберите гамму'

  return <Select size={DEFAULTS.selectSize} value={label} options={options} onChange={handleChange} />
}
const InputSize = () => {
  const defaultSize1 = 5
  const defaultSize2 = 4
  const label = 'Выберите размер тактов'

  const handleChange1 = (value, index) => {}
  const handleChange2 = (value, index) => {}

  return (
    <div>
      <p>{label}</p>
      <Slider
        size={DEFAULTS.sliderSize}
        value={defaultSize1}
        min={2}
        max={200}
        step={1}
        mode="relative"
        onChange={handleChange1}
      />
      <Slider
        size={DEFAULTS.sliderSize}
        value={defaultSize2}
        min={2}
        max={200}
        step={1}
        mode="relative"
        onChange={handleChange2}
      />
    </div>
  )
}
const SetupButtons = () => {
  const handleSuccess = () => {}
  const handleReset = () => {}

  return (
    <div>
      <TextButton text="Generate & Play" onClick={handleSuccess} />
      <TextButton text="Reset" onClick={handleReset} />
    </div>
  )
}
const SetupForm = () => {
  return <Select />
}
