import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setupChangeSize, setupChangeParts } from '../../store/actions'

const Setup = () => {
  const dispatch = useDispatch()
  const { size, parts } = useSelector(state => state)

  const changeHandlerSize = event => dispatch(setupChangeSize(event.target.value))
  const changeHandlerParts = event => dispatch(setupChangeParts(event.target.value))

  const min = 2
  const max = 20

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Setup Melody Generator</h5>
        <div>
          <p className="label">Pattern Size</p>
          <input type="range" min={min} max={max} step={1} value={size} onChange={changeHandlerSize} />
          <p>{size}</p>
        </div>
        <div>
          <p className="label">Pattern Parts</p>
          <input type="range" min={min} max={max} step={1} value={parts} onChange={changeHandlerParts} />
          <p>{parts}</p>
        </div>
      </div>
    </div>
  )
}

export default Setup
// export default connect(null, null)(Setup)
