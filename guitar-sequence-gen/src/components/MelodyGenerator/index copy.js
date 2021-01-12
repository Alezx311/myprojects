import * as Tone from 'tone'
import MusicHelpers from './Helpers'

function getDistSynth() {
  // const dist = new Tone.Distortion().toMaster()
  // const synth = new Tone.PolySynth().connect(dist)
  const synth = new Tone.PolySynth().toDestination()

  return synth
}
export class Synth {
  constructor() {
    this.instrument = getDistSynth()
    Tone.Transport.start()
    this.sequences = null
    this.sequenceOnPlay = null
  }

  generateSequence(size, key, scale) {
    const playable = MusicHelpers.rand.sequence(size, key, scale)

    console.log(playable)

    this.sequenceOnPlay = new Tone.Sequence((time, { note, duration }) => {
      console.log(Tone.Transport.sampleTime)
      this.instrument.triggerAttackRelease(note, 0.01, time)
    }, playable[0])
    this.sequenceOnPlay.humanize = true

    this.pattern = new Tone.Pattern(
      (time, { note, duration }) => {
        console.log('In pattern', playable[0], note, duration)
        this.instrument.triggerAttackRelease(note, duration, time)
      },
      playable[0],
      'upDown'
    )
    this.pattern.humanize = true
  }

  playSequence() {
    this.sequenceOnPlay.start(0)
    // this.pattern.start(0)
  }

  pauseSequence() {
    this.sequenceOnPlay.stop(0)
  }

  playSound(note = 'C4', duration = '8n') {
    this.instrument.triggerAttackRelease(note, duration)
  }

  randDuration() {
    return `${2 * Math.ceil(Math.random() * 10)}t`
  }

  addNoteToSequence(note, duration = this.randDuration()) {
    this.sequences.push({ note, duration, time: Date.now() })
  }
}
