let synth = new Tone.AMSynth().toMaster()

document.querySelector('tone-keyboard').addEventListener('noteon', e => {
  synth.triggerAttack(e.detail.name)
})

document.querySelector('tone-keyboard').addEventListener('noteoff', e => {
  synth.triggerRelease()
})