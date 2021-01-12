import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setupChangeSize, setupChangeParts } from '../../store/actions'

const SetupSize = () => {
  const dispatch = useDispatch()
  const size = useSelector(state => state.setup.size)

  return (
    <div>
      <p className="label">Pattern Size</p>
      <input type="range" min={2} max={20} step={1} value={size} onChange={() => dispatch(setupChangeSize())} />
    </div>
  )
}
const SetupParts = () => {
  const dispatch = useDispatch()
  const parts = useSelector(state => state.setup.parts)

  return (
    <div>
      <p className="label">Pattern Parts</p>
      <input type="range" min={2} max={20} step={1} value={parts} onChange={() => dispatch(setupChangeParts())} />
    </div>
  )
}

const Setup = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Setup Melody Generator</h5>
        <SetupSize />
        <SetupParts />
      </div>
    </div>
  )
}

export default Setup
// export default connect(null, null)(Setup)
