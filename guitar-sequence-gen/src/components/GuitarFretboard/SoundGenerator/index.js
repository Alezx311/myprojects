import * as Tone from 'tone'
import * as SampleLibrary from 'tonejs-instruments'

const GuitarSound = SampleLibrary.load({ instruments: 'guitar-electric' })

function initSynth() {
  const synth = new Tone.Synth().toDestination()
}
function play(instrument, note, duration) {
  return instrument.triggerAttackRelease(note, duration)
}
