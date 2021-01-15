import React from 'react'
import { useSelector } from 'react-redux'

const ViewAsText = () => {
  const state = useSelector(state => state)

  return (
    <div className="row">
      <span className="col text-center">
        <span>State:</span>
        {Object.entries(state).map((ent, key) => {
          return (
            <strong className="text-center" key={key}>
              <em>{ent.join(' : ').substring(0, 50) + '...'}</em>
              <br />
            </strong>
          )
        })}
      </span>
      <span className="col text-center">
        <span>Tone Transport:</span>
        <br />
        {Object.entries(state?.transport?.get() ?? {}).map((ent, key) => {
          return (
            <strong className="text-center" key={key}>
              <em>{ent.join(' : ').substring(0, 50) + '...'}</em>
              <br />
            </strong>
          )
        })}
      </span>
    </div>
  )
}
const ViewAsSymbols = () => {
  const state = useSelector(state => state)

  return (
    <span className="col text-center">
      <span>State value: {state.value}</span>
      <br />
      <span>Track value: {state?.track?.value}</span>
    </span>
  )
}

const View = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <ViewAsText />
        <ViewAsSymbols />
      </div>
    </div>
  )
}

export default View
