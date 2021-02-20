const Character = props => {
  return (
    <div className="container">
      <p>Character</p>
      <div {...props}></div>
    </div>
  )
}
const Color = props => {
  return (
    <div className="container">
      <p>Color</p>
      <div {...props}></div>
    </div>
  )
}
const Bliss = props => {
  return (
    <div className="container">
      <p>Bliss</p>
      <div {...props}></div>
    </div>
  )
}
const Controls = props => {
  return (
    <div className="container">
      <p>Controls</p>
      <div {...props}></div>
    </div>
  )
}

const Visualize = props => (
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <Character />
        <Color />
        <Bliss />
        <Controls />
      </div>
    </div>
  </div>
)

export default Visualize
