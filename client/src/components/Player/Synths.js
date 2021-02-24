// import { SYNTHS } from '../constants'
// import { Note } from '../helpers'

// const Synths = props => {
//   const synths = SYNTHS.map(name => ({ name, synth: new Tone[name]().toDestination() }))

//   return synths.map(({ synth, name }, key) => (
//     <div className="card shadow-lg bg-light bg-gradient m-3" key={key}>
//       <div className="card-body text-center">
//         <h6 className="fw-bold fst-italic">{name}</h6>
//         <div className="row">
//           <NoteButtons synth={synth} />
//         </div>
//       </div>
//     </div>
//   ))
// }