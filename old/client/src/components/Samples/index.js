import React, {useState} from 'react'
import * as Tone from 'tone'
import { Random, Note, Sound } from '../helpers'
import { Box, Button, Text } from 'grommet'

const loadSamples = instrument => {
  const samples = Sound.samplesUrl(instrument)

  const sampler = new Tone.Sampler

}