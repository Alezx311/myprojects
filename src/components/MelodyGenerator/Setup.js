import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const SetupChooseSize = () => {
  const dispatch = useDispatch()
  const size = useSelector(state => state.size)

  const changeHandler = e => dispatch(actions.setupChangeSize(e.target.value))

  return (
    <>
      <label for="inputRangeSize" className="form-label">
        Size
      </label>
      <input
        id="inputRangeSize"
        className="form-range"
        type="range"
        min={3}
        max={16}
        value={size}
        step={1}
        onChange={changeHandler}
      />
    </>
  )
}
const SetupChooseParts = () => {
  const dispatch = useDispatch()
  const parts = useSelector(state => state.parts)

  const changeHandler = e => dispatch(actions.setupChangeParts(e.target.value))

  return (
    <>
      <label for="inputRangeParts" className="form-label">
        Parts
      </label>
      <input
        id="inputRangeParts"
        className="form-range"
        type="range"
        min={3}
        max={16}
        value={parts}
        step={1}
        onChange={changeHandler}
      />
    </>
  )
}

const SetupChooseInstrument = () => {
  const dispatch = useDispatch()

  const changeHandler = e => {
    dispatch(actions.changeInstrument(e.target.value))
  }

  return (
    <div>
      <label for="inputSelectInstrument">Select instrument</label>
      <select className="form-select" id="inputSelectInstrument" onChange={changeHandler}>
        <option>PolySynth</option>
        <option>Synth</option>
        <option>MetalSynth</option>
        <option>Guitar</option>
      </select>
    </div>
  )
}

const SetupForm = () => (
  <div className="input-group mb-3">
    <SetupChooseInstrument />
    <SetupChooseSize />
    <SetupChooseParts />
  </div>
)

export default SetupForm
