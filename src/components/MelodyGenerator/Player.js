import React from 'react'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const PlayerButton = ({
  text = 'Button',
  onClick = e => console.log('Pressed', e?.target),
  className = 'btn btn-success'
}) => (
  <button className={`${className} m-1`} onClick={onClick}>
    {text}
  </button>
)

const PlayerControlPlayPause = () => {
  const dispatch = useDispatch()
  const { player } = useSelector(state => state)

  let iconPlay = <i className="fa fa-play text-center"> Generate & Play</i>
  let iconPause = <i className="fa fa-pause text-center"> Pause</i>

  if (player.isPlaying === true) {
    return <PlayerButton onClick={() => dispatch(actions.updatePlayer('Pause'))} text={iconPause} />
  } else {
    return <PlayerButton onClick={() => dispatch(actions.updatePlayer('Play'))} text={iconPlay} />
  }
}

const Player = () => (
  <div className="container">
    <PlayerControlPlayPause />
  </div>
)

export default Player
