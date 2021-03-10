import React from 'react'
import { Player } from './Player'
import { Guitar } from './Guitar'
import { Box } from 'grommet'

export const Main = props => {
  return (
    <Box
      height="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round
      alignSelf="start"
    >
      <Box direction="column" justify="center" align="center" pad="large" gap="large">
        <Guitar />
        <Player />
      </Box>
    </Box>
  )
}
