import React from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateSound } from '../../store/actions'
import { NOTES, SCALES, randomArrayElement } from './Helpers'

const getOptions = arr => arr.map(v => ({ value: v, label: v }))

const optionsKey = NOTES
const optionsScale = SCALES
const optionsSize = [3, 4, 5, 7, 9, 11, 13, 17, 20, 100]
const optionsParts = [3, 4, 5, 7, 9, 11, 13, 17, 20, 100]
const optionsOctave = [1, 2, 3, 4]
const optionsInstrument = ['Synth', 'PolySynth']
// const optionsInstrument = ['Synth', 'PolySynth', 'Guitar']
const randomSoundSetup = () => ({
  size: randomArrayElement(optionsSize),
  parts: randomArrayElement(optionsParts),
  key: randomArrayElement(optionsKey),
  // octave: randomArrayElement(optionsOctave),
  scale: randomArrayElement(optionsScale)
  // instrument: randomArrayElement(optionsInstrument)
})

const SetupSelectLabel = ({ text }) => <div className="text-center align-middle m-1">{text}</div>

const SetupSelect = ({ text, options }) => {
  const dispatch = useDispatch()
  const name = text.toLowerCase()
  const value = useSelector(state => state.sound[name])
  const onChange = option => dispatch(updateSound(Object.fromEntries([[name, option.value]])))

  return (
    <div className="col">
      <SetupSelectLabel text={text} />
      <Select value={{ value, label: value }} onChange={onChange} options={getOptions(options)} />
    </div>
  )
}

const SetupButton = ({
  text = 'Button',
  onClick = ({ target }) => console.log('Pressed', target),
  className = 'btn btn-primary'
}) => (
  <button className={`${className} m-1`} onClick={onClick}>
    {text}
  </button>
)

const SetupRandomize = () => {
  const dispatch = useDispatch()
  const onClick = () => dispatch(updateSound(randomSoundSetup()))

  return (
    <div className="col">
      <SetupButton text="Randomize" onClick={onClick} />
    </div>
  )
}

const Setup = () => {
  return (
    <div className="container">
      <div className="row">
        <SetupSelect text="Key" options={optionsKey} />
        <SetupSelect text="Scale" options={optionsScale} />
        <SetupSelect text="Size" options={optionsSize} />
        <SetupSelect text="Parts" options={optionsParts} />
        <SetupSelect text="Octave" options={optionsOctave} />
        <SetupSelect text="Instrument" options={optionsInstrument} />
      </div>
      <div className="row">
        <SetupRandomize />
      </div>
    </div>
  )
}

export default Setup
