import * as Tone from 'tone'
import * as SampleLibrary from 'tonejs-instruments'

function initGuitar() {
  const guitar = SampleLibrary.load({ instruments: 'guitar-electric' })

  return guitar
}
function initSynth() {
  const synth = new Tone.Synth().toDestination()

  return synth
}
function playSound(instrument, note, duration) {
  return instrument.triggerAttackRelease(note, duration)
}

exports.default = { initGuitar, initSynth, playSound }
