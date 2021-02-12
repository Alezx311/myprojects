<<<<<<< HEAD:src/App.js
import MelodyGenerator from './components/MelodyGenerator'
// import GuitarFretboard from './components/GuitarFretboard'
=======
// import MelodyGenerator from './components/MelodyGenerator'
import List from './components/MelodyGenerator/List'
>>>>>>> 687f2eac3ed937cfc2b493d58f9bc4488c0cc004:guitar-sequence-gen/src/App.js

function App() {
  return (
    <div className="container pt-5">
      <div className="row">
        <h1>Header</h1>
      </div>
      <div className="row">
        {/* <MelodyGenerator /> */}
        <List />
      </div>
      {/* <div className="row">
        <GuitarFretboard />
      </div> */}
      <div className="row">
        a<h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
