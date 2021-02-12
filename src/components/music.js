import { Rhythm } from 'rhythmical'

import { Tone } from 'tone/build/esm/core/Tone'
import { INSTRUMENT_SAMPLES } from './constants'

export class Rhythms {
  static render = ({ notesArray, cycle }) => Rhythm.render(notesArray, cycle)
  static flat = ({ notesArray }) => Rhythm.flat(notesArray)

  static four = ['A', 'C', 'E', 'G']
  static waltz = ['C', ['E', 'E'], ['G', 'G']]
  static swingCymbal = [1, [2, 0, 1], 1, [2, 0, 1]]
  static swingHihat = [0, 1, 0, 1]

  static rhytmsArray = [this.four, this.waltz, this.swingCymbal, this.swingHihat]
}

export class ReactSounds {}

export default class Sounds {
  //* Default arguments
  static options = {
    synth: this.synth,
    instrument: 'guitar-acoustic',
    startTime: 0,
    notesArray: null,
    events: null,
    cycle: 4,
    time: null,
    sequenceDivider: null,
    patternMove: null,
    eventNote: { value: null, duration: null, velocity: null },
    partOptions: { loop: true, loopEnd: this?.cycle ?? 4 }
  }
  static init = async () => (await Tone.start()) && console.log('Tone.js is ready')
  //* Instruments
  static synth = new Tone.PolySynth().toDestination()
  //* Load samples data for valid sample instrument name
  static loadSamples = (args, { instrument } = this.mergeOptions(args)) => {
    const samplesData = INSTRUMENT_SAMPLES?.[instrument] ?? false
    const sampler = new Tone.Sampler({ ...samplesData }).toDestination()

    return { ...samplesData, sampler }
  }
  static samplesExample = () => {
    const { sampler } = this.loadSamples()

    this.playArray({ notesArray: Rhythms.rhytmsArray, synth: sampler })
  }
  //* Transport controls
  static stop = (time = 0) => Tone.Transport.stop(time)
  static start = (time = 0) => Tone.Transport.start(time)

  //* For get full options list with, user arguments and default options
  static mergeOptions = args => Object.assign({}, this.options, ...{ args })
  static rhythm = (args, options = this.mergeOptions(args)) => {}
  static melody = (args, options = this.mergeOptions(args)) => {}
  static polyMelody = (args, options = this.mergeOptions(args)) => {}
  //* Play One Sound with options
  static playSound = args => {
    const { time, eventNote, synth } = this.mergeOptions(args)
    const { value, duration, velocity } = eventNote

    synth.triggerAttackRelease(time, value, duration, velocity)
  }
  //* Create Tone.js Part
  static part = args => {
    const { events, startTime, partOptions } = this.mergeOptions(args)
    return new Tone.Part(this.playSound, events).start(startTime).set(partOptions)
  }
  //* Create Tone.js Pattern
  static pattern = args => {
    const { events, startTime, partOptions, patternMove } = this.mergeOptions(args)
    return new Tone.Pattern(this.playSound, events).start(startTime).set(partOptions)
  }
  //* Create Tone.js Sequence
  static sequence = args => {
    const { events, startTime, partOptions, sequenceDivider } = this.mergeOptions(args)
    return new Tone.Sequence(this.playSound, events).start(startTime).set(partOptions)
  }
  //* Play Array of notes
  static playArray = (args, options = this.mergeOptions(args)) => {
    this.part({ ...options, events: Rhythms.render(options) }) ?? this.start()
  }
  //* Play Example Rhythms
  static playArrayExample = () => this.playArray({ notesArray: Rhythms.rhytmsArray })
}
