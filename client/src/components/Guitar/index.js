import React from 'react'
import { TUNINGS } from '../constants'
import { Note } from '../classes'
import { String } from './String'

const values = {
  strings: 6,
  tuning: 'E Standart',
  frets: 24
}

const Strings = ({ strings = 6 }, ...props) => {
  return TUNINGS[values.tuning].map(openFretNote => (
    <String openFretNote={new Note(openFretNote)} frets={values.frets} key={openFretNote + values.frets} />
  ))
}
