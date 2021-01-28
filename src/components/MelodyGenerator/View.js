import React from 'react'
import ReactJson from 'react-json-view'
import Sketch from 'react-p5'
import { useSelector } from 'react-redux'

const ViewSketch = ({ size = 300 }) => {
  let x = 10
  let y = 10
  let w = 10
  let h = 10
  let speed = 10

  const DrawFigure = (p5, type) => {
    switch (type) {
      case 'Rectangle':
        return p5.rect(x, y, w, h)
      default:
        return p5.ellipse(x, y, w, h)
    }
  }
  const MoveFigure = () => {
    w = ~~((Math.random() * size) / 10)
    h = ~~((Math.random() * size) / 10)

    if (x > size) {
      y += speed
      x = 10
    } else if (y > size) y = 10
    else x += ~~(Math.random() * speed)
  }
  const DrawBackground = (p5, color = 'gray') => {
    if (color === 'random') {
      const colors = ['green', 'red', 'blue', 'gray', 'black']
      color = colors[~~(Math.random() * colors.length)]
    }
    return p5.background(color)
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(size, size).parent(canvasParentRef)
  }

  const draw = p5 => {
    DrawBackground(p5)
    // DrawFigure(p5)
    DrawFigure(p5, 'Rectangle')
    MoveFigure()
  }

  return <Sketch setup={setup} draw={draw} />
}

const ViewPlayer = () => {
  const { player } = useSelector(state => state)
  // const melodyStat = player.melody?.map(val => `${val.note}/${val.duration}`).join(' -> ')
  return (
    // <div className="row">
    //   <label>Melody</label>
    //   <div>{melodyStat}</div>
    //   <ReactJson displayObjectSize={true} src={player.melody} />
    // </div>
    <div className="col">
      <label>Player</label>
      <ReactJson src={player.melody} />
    </div>
  )
}
const ViewSound = () => {
  const { sound } = useSelector(state => state)
  return (
    <div className="col">
      <label>Sound</label>
      <ReactJson src={sound} />
    </div>
  )
}
const ViewFretboard = () => {
  const { fretboard } = useSelector(state => state)
  return (
    <div className="col">
      <label>Fretboard</label>
      <ReactJson src={fretboard} />
    </div>
  )
}

const View = () => (
  <div className="container">
    <div className="row">
      <ViewPlayer />
      <ViewSound />
      <ViewFretboard />
      {/* <ViewSketch /> */}
    </div>
  </div>
)

export default View
