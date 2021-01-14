// import MelodyGenerator from './components/MelodyGenerator'
import List from './components/MelodyGenerator/List'

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
      <div className="row">
        a<h1>Footer</h1>
      </div>
    </div>
  )
}

export default App
