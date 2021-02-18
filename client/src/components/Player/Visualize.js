import React from 'react'
import { Figure, Image } from 'react-bootstrap'

const Character = props => {
  return <div>Character</div>
}
const Color = props => {
  return <div>Color</div>
}
const Bliss = props => {
  return <div>Bliss</div>

  // <Image src={src} rounded></Image>
}
const Controls = props => {
  return <div>Controls</div>
}

const Visualize = props => (
  <Figure>
    <Figure.Caption>{props.note}</Figure.Caption>
    <Figure.Image>
      <Bliss />
    </Figure.Image>
    <Figure.Caption>
      <Character />
    </Figure.Caption>
    <Figure.Caption>
      <Color />
    </Figure.Caption>
    <Figure.Caption>
      <Controls />
    </Figure.Caption>
  </Figure>
)
