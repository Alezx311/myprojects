import * as Tone from 'tone'
// import * as SampleLibrary from 'tonejs-instruments'

export class Synth {
  constructor() {
    this.instrument = new Tone.PolySynth().toDestination()

    Tone.Transport.start()
  }

  stop() {
    Tone.Transport.stop()
  }

  playSound(note = 'C4', duration = '8n', time = Tone.now()) {
    this.instrument.triggerAttackRelease(note, duration, time)
  }
}

export const createToneSynth = () => new Tone.PolySynth().toDestination()

// export const createToneGuitar = () => SampleLibrary.load({ instruments: 'guitar-electric'}).toMaster()

export const createTonePattern = ({ instrument, notes }) => {
  const playSoundCallback = (time, note) => {
    console.log(`Pattern Play :=> \nTime: ${time}\nNote: ${note}`)

    instrument.triggerAttackRelease(note, time)
  }
  const pattern = new Tone.Pattern(playSoundCallback, arr)
}

export const createToneSequence = ({ instrument, notes }) => {
  const playSoundCallback = (time, note) => {
    console.log(`Sequence Play :=> \nTime: ${time}\nNote: ${note}`)

    instrument.triggerAttackRelease(note, time)
  }
  const sequence = new Tone.Sequence(playSoundCallback, arr)
}
