import * as Tone from 'tone'
import MusicHelpers from './Helpers'

const initSynth = () => {
  const synth = new Tone.PolySynth().toDestination()
  return synth
}
const getPattern = opt => {
  const options = MusicHelpers.generateOptions(opt)
  const array = MusicHelpers.Pattern(options)
  const handler = (time, { note, duration }) => {
    this.instrument.triggerAttackRelease(note, duration, time)
  }

  const sound = new Tone.Pattern(handler, array).humanize(true)

  return { sound, array }
}

const getSequence = opt => {
  const options = MusicHelpers.generateOptions(opt)
  const array = MusicHelpers.Sequence(options)
  const handler = (time, { note, duration }) => {
    this.instrument.triggerAttackRelease(note, duration, time)
  }

  const sound = new Tone.Sequence(handler, array).humanize(true)

  return { sound, array }
}

export class Sound {
  constructor() {
    this.instrument = initSynth()
    this.pattern = getPattern()
    this.sequence = getSequence()

    Tone.Transport.start()
  }

  showStat() {
    console.log(this.pattern.array.toString())
    console.log(this.sequence.array.toString())
  }

  playSequence() {
    this.pattern.sound.start(1)
  }
  playPattern() {
    this.sequence.sound.start(1)
  }
  stop() {
    Tone.Transport.start()
  }

  playNote(note, duration, time = 1) {
    this.instrument.triggerAttackRelease(note, duration, time)
  }
}
