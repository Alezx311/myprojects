import React from 'react'
import { useSelector } from 'react-redux'
// import { MUSIC_VALUES, DEFAULTS } from './Helpers'

const ViewAsText = () => {
  const state = useSelector(state => state)

  return (
    <div className="col">
      <p>ViewAsText</p>
      <ul className="list-unstyled">
        <li>size: {state?.size ?? 'Unknown'}</li>
        <li>parts: {state?.parts ?? 'Unknown'}</li>
        <li>note: {state?.note ?? 'Unknown'}</li>
        <li>octave: {state?.octave ?? 'Unknown'}</li>
        <li>instrument: {state?.instrument?.toString() ?? 'Unknown'}</li>
        <li>scale: {state?.scale ?? 'Unknown'}</li>
        <li>text: {state.text ?? 'Unknown'}</li>
        <li>pattern: {state?.pattern?.length ?? 'Unknown'}</li>
        <li>patterns: {state?.patterns?.length ?? 'Unknown'}</li>
        <li>track: {state?.track?.toString()}</li>
      </ul>
    </div>
  )
}
const ViewAsSymbols = () => {
  const { text } = useSelector(state => state)

  return <span className="text">{text}</span>
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
