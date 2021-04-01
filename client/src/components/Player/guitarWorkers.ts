// import Meyda from "meyda";
import { Random } from 'jsuseful'

// TODO import guitar records
export const guitar_record_names: string[] = [
  '2_5449763210234170163.mp3',
  'audio_2021-03-27_23-17-38.ogg',
  'Gm speed.mp3',
]
export const riffFromFrets = (selectedFrets: []) => {
  const riffSize = Random.number(5, 20)
  let riff = Random.arrayValues(selectedFrets, riffSize)

  return riff
}

// export const loadSamples = async (name: string): Promise<void> => {
//   const samplesUrlEntryes = O                                                      bject.entries(INSTRUMENTS[name]).map(([key, val]): [string, string] => [
//     key,
//     `/samples/${name}/${val}`,
//   ]);
//   const sampler = new Sampler(Object.fromEntries(samplesUrlEntryes));

//   // return sampler
// };

export async function mediaStream(): Promise<void> {
  try {
    const meter = new Tone.Meter()
    const mic = new Tone.UserMedia().connect(meter)
    await mic.open()

    setInterval(() => console.log(meter.getValue()), 100)
  } catch (err) {
    console.error(err?.message)
  }
}

// export function splitToChunks(sample: Player): Promise<Sampler> {}
