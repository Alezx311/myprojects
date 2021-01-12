import React from 'react'
import { useSelector } from 'react-redux'
// import { MUSIC_VALUES, DEFAULTS } from './Helpers'

const ViewAsText = () => {
  const stateValues = useSelector(state => state)

  return (
    <div className="col">
      <p>ViewAsText</p>
      <ul className="list-unstyled">
        <li>Size: {stateValues.size}</li>
        <li>Parts: {stateValues.parts}</li>
        <li>Note: {stateValues.note}</li>
        <li>Octave_min: {stateValues.octave_min}</li>
        <li>Octave_max: {stateValues.octave_max}</li>
        <li>Scale: {stateValues.scale}</li>
        <li>IsPlaying: {stateValues.isPlaying}</li>
        <li>Text: {stateValues.text}</li>
        <li>Symbol: {stateValues.symbol}</li>
      </ul>
    </div>
  )
}
const ViewAsSymbols = () => {
  return (
    <div className="col">
      <div>ViewAsSymbols</div>
    </div>
  )
}

const View = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">View Melody</h5>
        <div className="container">
          <div className="row">
            <ViewAsText />
            <ViewAsSymbols />
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
