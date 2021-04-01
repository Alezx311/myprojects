// import Meyda from "meyda";
import { Random } from 'jsuseful'
import Tone, { Player, Sampler, UserMedia } from 'tone'
import { INSTRUMENTS } from '../constants'

// export const loadSamples = async (name: string): Promise<void> => {
//   const samplesUrlEntryes = Object.entries(INSTRUMENTS[name]).map(([key, val]): [string, string] => [
//     key,
//     `/samples/${name}/${val}`,
//   ]);
//   const sampler = new Sampler(Object.fromEntries(samplesUrlEntryes));

//   // return sampler
// };

// export async function mediaStream(): Promise<void> {
//   try {
//     const meter = new Tone.Meter();
//     const mic = new Tone.UserMedia().connect(meter);
//     await mic.open();

//     setInterval(() => console.log(meter.getValue()), 100);
//   } catch (err) {
//     console.error(err?.message);
//   }
// }

// export function splitToChunks(sample: Player): Promise<Sampler> {}
