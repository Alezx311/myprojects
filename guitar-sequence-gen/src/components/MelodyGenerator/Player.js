import React from 'react'
// import { MUSIC_VALUES, DEFAULTS } from './Helpers'

// import { useDispatch, useSelector } from 'react-redux'
// import { listButtonClick, setupChangeParts, setupChangeSize } from '../../store/actions'

const Player = () => {
  // const stateValues = useSelector(state => state)

  const playButtonHandler = event => {
    console.log('playButtonHandler')
  }
  const refreshButtonHandler = event => {
    console.log('refreshButtonHandler')
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Player Controls</h5>
        <button type="button" className="btn btn-success btn-sm" onClick={playButtonHandler}>
          Play\Pause
        </button>
        <button type="button" className="btn btn-success btn-sm" onClick={refreshButtonHandler}>
          Refresh Pattern
        </button>
      </div>
    </div>
  )
}

export default Player
