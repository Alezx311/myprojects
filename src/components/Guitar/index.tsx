import React, { useState } from 'react'
import * as Tone from 'tone'
import { INITIAL_STATES, GUITAR_TUNINGS, TUNING_NAMES, NOTES, SCALES, SYNTHS, INSTRUMENTS } from '../constants'
import { Random } from 'jsuseful'
import { Sound } from '../helpers'
import { Box, Button, Text, DropButton } from 'grommet'

export default function Guitar() {
  const [state, setState] = useState(INITIAL_STATES)
  const reducer = (obj: object): Promise<void> => Promise.resolve(setState({ ...state, ...obj }))

  return <div>Hi Guitar</div>
}

// export function GuitarFretBoard(props) {
//   const [state, setState] = useState({
//     frets: 24,
//     strings: 6,
//     tuning: 'E Standart'
//   })

//   const reducer = obj => setState({ ...state, ...obj })

//   const stringNotes = GUITAR_TUNINGS[state.tuning]

//   if (state.strings > 6) {
//     const additionalStrings = stringNotes.map(v => Sound.noteSteps(v, 12))
//     stringNotes = [...stringNotes, ...additionalStrings].filter((v, i) => i < state.strings).reverse()
//   }

//   const FretBoard = () =>
//     stringNotes.map(openNote => (
//       <Box key={openNote} direction='row' gap='small'>
//         {Sound.noteStepsArray(openNote, state.frets).map(note => (
//           <Button
//             key={note}
//             size='small'
//             label={note}
//             onClick={() => {
//               reducer({ rootNote: note })
//               Sound.playNote(note)
//             }}
//           ></Button>
//         ))}
//       </Box>
//     ))

//   const RiffVIew = () => (
//     <>
//       <Text hidden={!state.riff.length}>{state.riff.filter((v, i) => i < 10).join(' -> ')}</Text>
//       <Text>{JSON.stringify(state.valueOnPlay, null, '\t')}</Text>
//     </>
//   )

//   const RiffPlay = () => {
//     const onPlay = () => {
//       const notes = state.riff.map(v => Sound.prepareNoteForPlay(v))

//       Sound.playNotes(notes)
//     }

//     return (
//       <>
//         <Button disabled={state.isPlaying} label='Play' onClick={onPlay} />
//         <Button disabled={!state.isPlaying} label='Stop' onClick={onStop} />
//       </>
//     )
//   }

//   const SetupFretboard = () => (
//     <>
//       <DropSelect
//         label='Strings'
//         value={state.strings}
//         options={[4, 5, 6, 7, 8]}
//         onClick={v => reducer({ strings: v })}
//       />
//       <DropSelect label='Frets' value={state.frets} options={[12, 21, 24]} onClick={v => reducer({ frets: v })} />
//       <DropSelect label='Tuning' value={state.tuning} options={TUNING_NAMES} onClick={v => reducer({ tuning: v })} />
//     </>
//   )

//   const SetupRiff = () => (
//     <>
//       <DropSelect label='Root Note' value={state.rootNote} options={NOTES} onClick={v => reducer({ rootNote: v })} />
//       <DropSelect label='Scale' value={state.scale} options={SCALES} onClick={v => reducer({ scale: v })} />
//       <DropSelect
//         label='Melody Size'
//         value={state.size}
//         options={[10, 20, 50, 100]}
//         onClick={v => reducer({ size: v })}
//       />
//       <DropSelect
//         label='Sound Instrument'
//         value={state.instrumentName}
//         options={Object.keys(INSTRUMENTS)}
//         onClick={v => {
//           const urlEntries = Object.entries(INSTRUMENTS[v]).map(([key, val]) => [key, `/samples/${v}/${val}`])
//           const samples = Object.fromEntries(urlEntries)

//           synth = new Tone.Sampler(samples).toDestination()

//           reducer({ synthName: null, instrumentName: v })
//         }}
//       />
//     </>
//   )
//   const SetupButtons = () => (
//     <>
//       <Button
//         disabled={!state.rootNote}
//         label='Generate Riff'
//         onClick={() => {
//           const { rootNote, scale, size } = state
//           const riff = Note.melody(rootNote, scale, size)

//           reducer({ riff })
//         }}
//       />
//     </>
//   )
//   const SetupGuitar = () => (
//     <Box direction='row' align='center' gap='medium'>
//       <SetupFretboard />
//       <SetupRiff />
//       <SetupButtons />
//     </Box>
//   )
//   return (
//     <Box direction='column' align='center' gap='medium'>
//       <SetupGuitar />
//       <Fretboard />
//       <RiffView />
//       <RiffPlay />
//     </Box>
//   )
// }
