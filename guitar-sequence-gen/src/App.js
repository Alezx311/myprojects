import MelodyGenerator from './components/MelodyGenerator'

function App() {
  return (
    <div className="container pt-5">
      <div className="row">
        <h1>Header</h1>
      </div>
      <div className="row">
        <MelodyGenerator />
      </div>
      <div className="row">
        <h1>Footer</h1>
      </div>
      {/* <div className="row"></div> */}
      {/* <div className="row"></div> */}
    </div>
  )
}

export default App
