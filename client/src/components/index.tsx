import React, { useState } from 'react';

import { Player, ShowText } from './Player';
// import { Guitar } from './Guitar'
import { Box, Text } from 'grommet';

export function Main() {
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
    valueOnPlay: {},
  });

  const reducer = (obj: object): void => obj && setState({ ...state, ...obj });

  return (
    <Box
      height='xlarge'
      background='linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)'
      round
      alignSelf='start'
    >
      <Box direction='column' justify='center' align='center' pad='large' gap='large'>
        <Text>Hello!</Text>
        <Player />
      </Box>
    </Box>
  );
}
