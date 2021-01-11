import * as Tone from 'tone'
import MusicHelpers from './Helpers'

const initSynth = () => {
  const synth = new Tone.PolySynth().toDestination()
  Tone.Transport.start()

  return synth
}
const getPattern = opt => {
  const patternOptions = MusicHelpers.generateOptions(opt)
  const patternArray = MusicHelpers.Pattern(patternOptions)

  const patternObject = new Tone.Pattern((time, noteObj) => {
    this.instrument.triggerAttackRelease(noteObj.note, noteObj.duration, time)
  }, patternArray).humanize(true)

  return patternObject
}

const getSequence = opt => {
  const sequenceOptions = MusicHelpers.generateOptions(opt)
  const sequenceArray = MusicHelpers.Sequence(sequenceOptions)

  const sequenceObject = new Tone.Sequence((time, noteObj) => {
    this.instrument.triggerAttackRelease(noteObj.note, noteObj.duration, time)
  }, sequenceArray).humanize(true)

  return sequenceObject
}

export class Sound {
  constructor(props) {
    this.instrument = initSynth()
    this.pattern = getPattern(props)
    this.sequence = getSequence(props)
  }

  playSequence() {
    this.pattern.start(1)
  }
  playPattern() {
    this.sequence.start(1)
  }
  stop() {
    this.pattern.stop(1)
    this.sequence.stop(1)
  }

  playNote(note, duration, time = 1) {
    this.instrument.triggerAttackRelease(note, duration, time)
  }
}
