import React from 'react'

const Player = () => {
  const buttonRefreshHandler = () => {
    console.log('Button Refresh pressed')
  }
  const buttonPlayHandler = () => {
    console.log('Button Play pressed')
  }
  const buttonPauseHandler = () => {
    console.log('Button Pause pressed')
  }

  return (
    <div>
      <button onClick={buttonPlayHandler} className="btn btn-outline-success">
        <i className="fas fa-play"> Play</i>
      </button>
      <button onClick={buttonPauseHandler} className="btn btn-outline-success">
        <i className="fas fa-pause"> Pause</i>
      </button>
      <button onClick={buttonRefreshHandler} className="btn btn-outline-success">
        <i className="fas fa-refresh"> Refresh</i>
      </button>
    </div>
  )
}

export default Player
