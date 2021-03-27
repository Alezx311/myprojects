// import Meyda from "meyda";
import { Random } from 'jsuseful';
import Tone, { Player, Player, Sampler, UserMedia } from 'tone';

// TODO import guitar records
export const guitar_record_names: string[] = [
  '2_5449763210234170163.mp3',
  'audio_2021-03-27_23-17-38.ogg',
  'Gm speed.mp3',
];

export const guitar_record_samples: Player[] = guitar_record_names.map(file => {
  const player = new Tone.Player(`samples/guitar_long/${file}`).toDestination();
  return player;
});

export async function mediaStream(): Promise<void> {
  try {
    const meter = new Tone.Meter();
    const mic = new Tone.UserMedia().connect(meter);
    await mic.open();

    setInterval(() => console.log(meter.getValue()), 100);
  } catch (err) {
    console.error(err?.message);
  }
}



export function splitToChunks(sample: Player): Promise<Sampler> {}
