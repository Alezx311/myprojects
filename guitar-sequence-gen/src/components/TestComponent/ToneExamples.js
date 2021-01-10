import * as Tone from 'tone'

function ToneSynth() {
  const synth = new Tone.MembraneSynth().toMaster()

  function playSynth(note = 'C4', duration = '8n') {
    if (!note) {
      return false
    }

    synth.triggerAttackRelease(note, duration)
  }

  return (
    <div id="tone_examples">
      <span>ToneSynth</span>
      <button onClick={playSynth}>Synth</button>
    </div>
  )
}

export default function ToneExamples() {
  return (
    <div>
      <ToneSynth />
    </div>
  )
}
