// import * as Tone from 'tone'
import { Rhythms, Sounds } from './music'
import { Helpers, Constants } from './helpers'

// export const startContext = async () => {
//   await Tone.start()
//   console.log('tone loaded', Tone.context.state)
// }
// export const loadInstrument = async (name = 'guitar-electric') =>
//   await SampleLibrary.load({
//     instruments: 'guitar-electric',
//     baseUrl: '/samples/'
//   }).toDestination()
// export const loadSynth = () => new Tone.PolySynth(Tone.Synth, CONSTANTS.PolySynthOptions).toDestination()
export const loadSequence = (player, synth) => {
  player.synth = synth
  player.track = new Tone.Sequence((time, { note, duration, strength }) => {
    console.log('Playing', { note, duration, time, strength, player })
    player.synth.triggerAttackRelease(note, duration, time, strength)
  }, player.generated.patterns).set({
    humanize: true,
    probability: 1,
    playbackRate: 1
  })
  player.transport = Tone.Transport
  player.transport.set({ bpm: 120 })

  return player
}
// export const generateRhythm = (len = 4) => {
//   const simple = Array(len).fill(1).map(v => )
// }
export const createSound = state => {
  startContext()

  const { sound, player, fretboard } = state
  const samples = new Tone.Sampler({
    samples: { ...CONSTANTS.SAMPLES['guitar-electric'] },
    baseUrl: `/samples/`,
    onload: () => {
      console.log('Samples loaded')
      player.generated = Random.pattern(sound)
      const updatedPlayer = loadSequence(player, samples)
      updatedPlayer.transport.start(0)
      updatedPlayer.track.start(0)

      console.log('state onload', { sound, player, fretboard, updatedPlayer })
      return { sound, player: updatedPlayer, fretboard }
    }
  }).toDestination()

  console.log('state', { sound, player, fretboard })
  return { sound, player, fretboard }
}
/* export const Filters = {
  AutoFilter: () => new Tone.AutoFilter(),
  AutoWah: () => new Tone.AutoWah(),
  Distortion: () => new Tone.Distortion(),
  BitCrusher: () => new Tone.BitCrusher(),
  Chebyshev: () => new Tone.Chebyshev(),
  AutoPanner: () => new Tone.AutoPanner(),
  Oscillator: () => new Tone.Oscillator(),
  Chorus: () => new Tone.Chorus(),
  Freeverb: () => new Tone.Freeverb(),
  JCReverb: () => new Tone.JCReverb(),
  WaveShaper: () => new Tone.WaveShaper(),
  Reverb: () => new Tone.Reverb(),
  Compressor: () => new Tone.Compressor(),
  StereoWidener: () => new Tone.StereoWidener(),
  AmplitudeEnvelope: () => new Tone.AmplitudeEnvelope()
} */
