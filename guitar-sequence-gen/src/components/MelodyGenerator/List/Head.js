import React from 'react'
import { notes } from '../MusicValues'

export default function Head() {
  notes.map(note => {
    ;<div>{note}</div>
  })
}
