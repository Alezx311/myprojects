import React from 'react'
import { Box } from 'grommet'

export function Container(props: object) {
  return (
    <Box
      height='large'
      background='linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)'
      round
      alignSelf='start'
      direction='column'
      justify='center'
      align='center'
      pad='medium'
      gap='medium'
      {...props}
    />
  )
}
