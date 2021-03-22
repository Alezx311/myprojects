import React, { useState } from 'react'

import { Player } from './Player'
import { Guitar } from './Guitar'
import { Box } from 'grommet'

export const Main = props => {
  const [state, setState] = useState({
    strings: 6,
    frets: 24,
    tuning: 'E Standart',
    rootNote: 'C2',
    scale: 'minor',
    size: 100,
    riff: [],
    synth: false,
    synthName: 'PolySynth',
    instrumentName: null,
    isPlaying: false,
    valueOnPlay: {}
  })
  const reducer = obj => setState({ ...state, ...obj })

  return (
    <Box
      height="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round
      alignSelf="start"
    >
      <Box direction="column" justify="center" align="center" pad="large" gap="large">
        <Guitar state={state} reducer={reducer} />
        {/* <Player /> */}
      </Box>
    </Box>
  )
}
