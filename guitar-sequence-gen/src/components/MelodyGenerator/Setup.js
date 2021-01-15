import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const SetupChooseInstrument = () => {
  const dispatch = useDispatch()
  const instrument = useSelector(state => state.instrument)

  const changeHandler = e => {
    dispatch(actions.changeInstrument(e.target.value))
  }

  return (
    <div>
      <label>Select instrument</label>
      <select className="form-select" onChange={changeHandler}>
        <option>PolySynth</option>
        <option>Synth</option>
        <option>MetalSynth</option>
        <option>Guitar</option>
      </select>
    </div>
  )
}

const Setup = () => {
  const dispatch = useDispatch()
  const { size, parts } = useSelector(state => state)

  const changeHandlerSize = event => dispatch(actions.setupChangeSize(event.target.value))
  const changeHandlerParts = event => dispatch(actions.setupChangeParts(event.target.value))

  const input_size_min = 4
  const input_size_max = 100

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Setup Melody Generator</h5>
        <div>
          <p className="label">Size</p>
          <input
            type="range"
            min={input_size_min}
            max={input_size_max}
            step={1}
            value={size}
            onChange={changeHandlerSize}
          />
          <span> {size}</span>
          <br />
          <span>----------</span>
          <br />
          <input
            type="range"
            min={input_size_min}
            max={input_size_max}
            step={1}
            value={parts}
            onChange={changeHandlerParts}
          />
          <span> {parts}</span>
        </div>
      </div>
      <SetupChooseInstrument />
    </div>
  )
}

export default Setup
