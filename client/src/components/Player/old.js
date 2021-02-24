// import React from 'react'
// import * as Tone from 'tone'
// import Visualize from './Visualize'
// import { SYNTHS, NOTES, SCALES, INSTRUMENTS } from '../constants'
// import { Note, Random } from '../helpers'

// const PlaySingle = props => {
//   return <button {...props}>PlaySingle</button>
// }
// const PlaySequence = props => {
//   return <button {...props}>PlaySequence</button>
// }
// const Generate = props => {
//   return <button {...props}>Generate</button>
// }
// const GenerateBySeed = props => {
//   return <button {...props}>GenerateBySeed</button>
// }
// const SynthExample = props => {
//   return <button {...props}>GenerateBySeed</button>
// }

// const NoteButtons = ({ synth, name }) => {
//   const playNote = note => {
//     synth.triggerAttackRelease(note, '8n', Tone.now())
//   }

//   const playNotes = (note, size) => {
//     const { text, color, octave, ...values } = Note.loadNoteFull(note)
//     const scaleNotes = Note.loadScale(text, 'minor').map(v => `${v}${octave}`)
//     const shuffles = Random.arrayShuffles(scaleNotes)
//     const sequenceNotes = Random.values(shuffles, size)

//     const sequence = new Tone.Sequence((time = Tone.now(), note) => {
//       synth.triggerAttackRelease(note, '8n', time, Math.random())
//     }, sequenceNotes).set({ humanize: true, probability: 1, playbackRate: 1 })

//     Tone.Transport.start(0)
//     sequence.start('+1')

//     return sequence
//   }

//   const PI_SHORT = `31415926535897932384626433832795028841971693993751058209749445923078164062`

//   const playMath = (str = PI_SHORT) => {
//     const notes = [...str].map(Note.loadNote).filter(Boolean)

//     const sequence = new Tone.Sequence((time = Tone.now(), { note, duration, velocity, ...opts }) => {
//       console.info(`${time} -> ${note}${duration}${velocity} -> ${opts}`)
//       synth.triggerAttackRelease(note, duration, time, velocity)
//     }, notes).set({ humanize: true })

//     sequence.start(0)
//     Tone.Transport.start('+1')
//   }

//   const PlayNote = ({ note, ...props }) => (
//     <button
//       type="button"
//       className="btn btn-sm btn-outline-success m-1"
//       onClick={() => {
//         playNote(note)
//       }}
//       {...props}
//     >
//       {note}
//     </button>
//   )
//   const PlayPi = ({ note, ...props }) => (
//     <button
//       type="button"
//       className="btn btn-sm btn-outline-success m-1"
//       onClick={() => {
//         playPi()
//       }}
//       {...props}
//     >
//       Play Pi
//     </button>
//   )
//   const PlayNotes = ({ note, size, text, ...props }) => (
//     <button
//       type="button"
//       className="btn btn-sm btn-outline-success m-1"
//       onClick={() => {
//         playNotes(note, size)
//       }}
//       {...props}
//     >
//       {text ?? note}
//     </button>
//   )

//   return (
//     <div className="container">
//       <div className="btn-group" role="group">
//         {NOTES.map(char => `${char}4`).map((note, key) => (
//           <>
//             <PlayPi />
//             <PlayNote note={note} key={key} />
//             <PlayNotes note={note} size={50} text="Long" />
//           </>
//         ))}
//       </div>
//     </div>
//   )
// }

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

// const Instruments = props => {
//   return (
//     <div className="container">
//       {Object.keys(INSTRUMENTS).map((value, key) => (
//         <div key={key} value={value}>
//           {value}
//         </div>
//       ))}
//     </div>
//   )
// }

// export const Player = props => {
//   return (
//     <div className="container container-fluid">
//       <Visualize />
//       <Synths />
//       <Instruments />
//     </div>
//   )
// }

// export default Player
