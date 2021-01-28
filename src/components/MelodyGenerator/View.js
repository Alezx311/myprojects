import React from 'react'
import ReactJson from 'react-json-view'
import Sketch from 'react-p5'
import { useSelector } from 'react-redux'

const CanvasValues = {
  width: 500,
  height: 500,
  // notesExample: ['c', 'f', 'bb', 'g', 'f', 'c', 'bb', 'c', 'f', 'f'],
  notesExample: ['a', 'ab', 'b', 'bb', 'c', 'd', 'db', 'e', 'eb', 'f', 'g', 'gb'],
  notesColors: {
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
}
const noteToColor = note => CanvasValues.notesColors?.[note] ?? '#808000'

const ViewSketch = ({ size = 300 }) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(size, size).parent(canvasParentRef)
  }

  const draw = p5 => {
    const { width, height, figureWidth, figureHeight, notesExample, notesColors } = CanvasValues
    const noteElementSize = width / notesExample.length

    p5.background(0)

    notesExample.map((v, i) => {
      let posX = noteElementSize * i + noteElementSize / 2
      let posY = height / 2
      const color = noteToColor(v)

      // posY = Math.random() > 0.5 ? posY + ~~(Math.random() * 10) : posY - ~~(Math.random() * 10)
      p5.ellipse(posX, posY, noteElementSize, noteElementSize).fill(color)
    })
  }

  return (
    <div className="text-center align-middle">
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}

const ViewPlayer = () => {
  const { player } = useSelector(state => state)
  return (
    <div className="col">
      <label>Player</label>
      <ReactJson src={player.melody?.mainNotes} />
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
      <ViewSketch />
    </div>
  </div>
)

export default View
