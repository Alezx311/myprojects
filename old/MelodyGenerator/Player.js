import React from 'react'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Sketch from 'react-p5'

const notesColors = {
  a: '#00ff00',
  ab: '#8000ff',
  b: '#00ffff',
  bb: '#ff80c0',
  c: '#ff0000',
  d: '#ffff00',
  db: '#ff00ff',
  e: '#0080c0',
  eb: '#808080',
  f: '#800000',
  g: '#ff8000',
  gb: '#8080c0'
}
const randomColor = (obj = notesColors) => Object.values(obj)[~~(Math.random() * obj?.length)]

const CanvasBlock = (size = 250) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(250, 250).parent(canvasParentRef)
  }
  const draw = p5 => {
    p5.background(0)

    p5.ellipse(10, 10, 2, 2).fill(randomColor())
  }

  return <Sketch setup={setup} draw={draw} />
}

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
    <CanvasBlock />
  </div>
)

export default Player
