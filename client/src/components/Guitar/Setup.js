import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateGuitar } from '../../store/actions'
import { TUNING_NAMES, TUNINGS } from '../constants'

// const optionsStrings = [4, 5, 6, 7, 8]
// const optionsFrets = [21, 24, 27]
// const optionsTunings = TUNING_NAMES
// const optionsSounds = ['guitar-acoustic', 'guitar-electric', 'guitar-nylon']

const optionsStrings = [
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 }
]
const optionsFrets = [
  { value: 21, label: 21 },
  { value: 24, label: 24 },
  { value: 27, label: 27 }
]
const optionsTunings = TUNING_NAMES.map(v => ({ label: v, value: TUNINGS[v] }))
const optionsSounds = [
  { label: 'Acoustic', value: 'guitar-acoustic' },
  { label: 'Electric', value: 'guitar-electric' },
  { label: 'Nylon', value: 'guitar-nylon' }
]
const propsStrings = { options: optionsStrings, placeholder: 'strings' }
const propsFrets = { options: optionsFrets, placeholder: 'frets' }
const propsTunings = { options: optionsTunings, placeholder: 'tunings' }
const propsSounds = { options: optionsSounds, placeholder: 'sounds' }

const changeFretboardState = (title, value) => {
  const update = Object.fromEntries([title, value])
}

const SelectElement = (props, { placeholder, options } = props) => {
  const dispatch = useDispatch()
  const selected = useSelector(state => state.guitar[placeholder])
  const onChange = ({ value }) => {
    dispatch(updateGuitar(placeholder, value))
  }

  return <Select value={{ value: selected }} { ...props, onChange } />
}
const SelectElements = props => {
  return (
    <div>
      <SelectElement {...props} options={optionsStrings} placeholder="strings" />
      <SelectElement {...props} options={optionsFrets} placeholder="frets" />
      <SelectElement {...props} options={optionsTunings} placeholder="tunings" />
      <SelectElement {...props} options={optionsSounds} placeholder="sounds" />
    </div>
  )
}
const SelectStrings = props => {
  const propValues = { ...props, options, defaultValue: options[0], placeholder, onChange }

  return <Select {...propValues} />
}
const SelectFrets = props => {
  const onChange = ({ value }) => placeholder(title, value)
  const propValues = { ...props, options, defaultValue: options[0], placeholder, onChange }

  return <Select {...propValues} />
}
const SelectTunings = props => {
  const onChange = ({ value }) => changeFretboardState(placeholder, value)
  const propValues = { ...props, options, defaultValue: options[0], placeholder, onChange }

  return <Select {...propValues} />
}
const SelectSounds = props => {
  const onChange = ({ value }) => changeFretboardState(placeholder, value)
  const propValues = { ...props, options, defaultValue: options[0], placeholder, onChange }

  return <Select {...propValues} />
}

const getOptions = arr => arr.map(v => ({ value: v, label: v }))

const SetupSelectLabel = ({ text }) => <div className="text-center align-middle m-1">{text}</div>

const SetupSelect = ({ text, options }) => {
  const dispatch = useDispatch()
  const name = text.toLowerCase()
  const value = useSelector(state => state.fretboard[name])
  const toUpdate = data => Object.fromEntries([[name, data.value]])
  const onChange = v => dispatch(updateGuitar(toUpdate(v)))

  return (
    <div className="col">
      <SetupSelectLabel text={text} />
      <Select value={{ value, label: value }} onChange={onChange} options={getOptions(options)} />
    </div>
  )
}

const Setup = () => (
  <div className="row">
    <SetupSelect text="Strings" options={optionsStrings} />
    <SetupSelect text="Frets" options={optionsFrets} />
    <SetupSelect text="Tuning" options={optionsTunings} />
    <SetupSelect text="Sound" options={optionsSounds} />
  </div>
)

export default Setup
