import React from 'react'
// import { MUSIC_VALUES, DEFAULTS } from './Helpers'

const Player = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Player Controls</h5>
        <button className="player_play_pause" onClick={() => console.log('button player_play_pause clicked')}>
          Play\Pause
        </button>
        <button className="player_regenerate" onClick={() => console.log('button player_regenerate clicked')}>
          Another Pattern
        </button>
      </div>
    </div>
  )
}

export default Player
