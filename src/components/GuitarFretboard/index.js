import React from 'react'
import { TUNINGS } from '../constants'
import { indexToNote } from '../converters'
import { LabelBlock } from '../reactHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { changeFretboard } from '../../store/actions'

export const FretboardSetupStrings = () => {
  const dispatch = useDispatch()
  const changeHandler = e => dispatch(changeFretboard({ strings: e.target.value }))
  const options = [6, 7, 8]

  return (
    <div>
      <LabelBlock labelId="change_fretboard_Strings" text="Change Strings" />
      <div className="input-group">
        <select className="form-select" id="change_fretboard_Strings" onChange={changeHandler}>
          {options.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export const FretboardSetupFrets = () => {
  const dispatch = useDispatch()
  const changeHandler = e => dispatch(changeFretboard({ tuning: e.target.value }))
  const options = [21, 24, 27]

  return (
    <div>
      <LabelBlock labelId="change_fretboard_Frets" text="Change Frets" />
      <div className="input-group">
        <select className="form-select" id="change_fretboard_Frets" onChange={changeHandler}>
          {options.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export const FretboardSetupTuning = () => {
  const dispatch = useDispatch()
  const changeHandler = e => dispatch(changeFretboard({ frets: e.target.value }))
  const options = ['E Standart', 'Drop D', 'Drop C', 'Drop B']

  return (
    <div>
      <LabelBlock labelId="change_fretboard_Tuning" text="Change Tuning" />
      <div className="input-group">
        <select className="form-select" id="change_fretboard_Tuning" onChange={changeHandler}>
          {options.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export const FretboardSetup = () => (
  <div>
    <FretboardSetupStrings />
    <FretboardSetupTuning />
    <FretboardSetupFrets />
  </div>
)
export const FretboardGenerated = () => {
  const dispatch = useDispatch()
  const fretboard = useSelector(state => state.fretboard)
  if (!fretboard || !fretboard.strings) {
    return <div>Not ready</div>
  }
  const tuningArray = TUNINGS[fretboard?.tuning]
  const stringsArray = Array(fretboard?.strings)
    .fill(1)
    .map((v, i) => tuningArray[i])
  const fretsArray = Array(fretboard?.frets).fill(1)
  const clickHandler = ({ fret, string }) => {
    console.log(fret, string)
    dispatch(changeFretboard({ fretboardClick: { fret, string } }))
  }

  return (
    <div className="list-group mx-auto">
      {stringsArray.map((string, stringKey) => (
        <div className="list-group list-group-horizontal" key={stringKey}>
          {fretsArray.map((fret, fretKey) => (
            <button
              className="list-group-item fas btn btn-success btn-sm"
              onClick={() => clickHandler({ fret, string })}
              // onMouseOver={() => console.log(string, stringKey, fret, fretKey)}
              key={fretKey}
              style={{ width: `5rem`, height: '2rem' }}
            >
              <i className="fas fa-play">{/* <span> {`${stringKey + 1}/${fretKey + 1}`}</span> */}</i>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export const Fretboard = () => (
  <div className="container">
    <div className="row text-center align-middle">
      <span>Setup</span>
      <FretboardSetup />
    </div>
    <div className="row text-center align-middle">
      <span>Generated</span>
      <FretboardGenerated />
    </div>
  </div>
)

export default Fretboard
