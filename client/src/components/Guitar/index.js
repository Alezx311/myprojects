import React from 'react';
import * as Tone from 'tone';
import { GUITAR_TUNINGS, TUNING_NAMES, NOTES, SCALES, INSTRUMENTS, SVG_WORDS } from '../constants';
import { Random, Note } from '../helpers';
import { Box, Button, DropButton } from 'grommet';
import ReactJson from 'react-json-view';

let synth;

const DropSelect = ({ label, value, options, onClick }) => {
  const dropContent = options.map((v) => <Button key={v} label={v} onClick={() => onClick(v)} />);
  const dropAlign = { top: 'bottom', right: 'right' };

  return <DropButton label={`${label}: ${value}`} dropAlign={dropAlign} dropContent={dropContent} />;
};

export const Guitar = (props) => {
  const { state, reducer } = props;
  const opened = GUITAR_TUNINGS[state.tuning];
  const octaved = opened.map((v) => Random.noteStep(v, 12));
  const stringNotes = [...opened, ...octaved].filter((v, i) => i < state.strings).reverse();

  const Fretboard = () =>
    stringNotes.map((open) => (
      <Box key={open} direction='row' gap='small'>
        {Random.noteSteps(open, state.frets).map((note) => (
          <Button
            key={note}
            size='small'
            label={note}
            onClick={() => {
              reducer({ rootNote: note });
              synth.triggerAttackRelease(note, '4n');
            }}
          />
        ))}
      </Box>
    ));

  const RiffView = () => (
    <Box>
      <ReactJson src={state} />
    </Box>
  );

  const RiffPlay = () => {
    const onPlay = () => {
      const bpm = Random.number(70, 130);
      const playbackRate = Math.random() * 2;
      const notes = state.riff.map((v) => Random.noteValues(v));

      // Генерить слово из зерна фразы
      // Выводить Клемент архива, символ, с длиной 20
      // const word = ;
      // const words = Array(5)
      //   .fill(1)
      //   .map((v) => [Random.arrayShuffleUnicals(notes).join('_'), word, Random.colorHex()]);

      // Генерить цвет в hex для фона
      // const colorHex = ;
      // Соединять линией контрастного цвета

      // console.log(words);

      new Tone.Sequence((time = Tone.now(), { note, duration, velocity }) => {
        const word = Random.arrayElement(SVG_WORDS);
        const words = Array(5)
          .fill(1)
          .map((v) => Random.arrayElement(SVG_WORDS));

        reducer({
          word,
          words,
          valueOnPlay: { note, duration, velocity },
          isPlaying: true,
        });
        synth.triggerAttackRelease(note, duration, time, velocity);
      }, notes).start(1);

      Tone.Transport.set({ bpm, humanize: true, playbackRate });
      Tone.Transport.start('+0.1');
    };

    const onStop = () => {
      Tone.Transport.stop(0);
      reducer({ isPlaying: false });
    };

    return (
      <div>
        <Button disabled={state.isPlaying} label='Play' onClick={onPlay} />
        <Button disabled={!state.isPlaying} label='Stop' onClick={onStop} />
      </div>
    );
  };

  const SetupFretboard = () => (
    <div>
      <DropSelect
        label='Strings'
        value={state.strings}
        options={[4, 5, 6, 7, 8]}
        onClick={(v) => reducer({ strings: v })}
      />
      <DropSelect label='Frets' value={state.frets} options={[12, 21, 24]} onClick={(v) => reducer({ frets: v })} />
      <DropSelect label='Tuning' value={state.tuning} options={TUNING_NAMES} onClick={(v) => reducer({ tuning: v })} />
    </div>
  );

  const SetupRiff = () => (
    <div>
      <DropSelect label='Root Note' value={state.rootNote} options={NOTES} onClick={(v) => reducer({ rootNote: v })} />
      <DropSelect label='Scale' value={state?.scale} options={SCALES} onClick={(v) => reducer({ scale: v })} />
      <DropSelect
        label='Melody Size'
        value={state.size}
        options={[10, 20, 50, 100, 200]}
        onClick={(v) => reducer({ size: v })}
      />
      <DropSelect
        label='Sound Instrument'
        value={state?.instrumentName}
        options={Object.keys(INSTRUMENTS)}
        onClick={(v) => {
          const urlEntries = Object.entries(INSTRUMENTS[v]).map(([key, val]) => [key, `/samples/${v}/${val}`]);
          const samples = Object.fromEntries(urlEntries);
          synth = new Tone.Sampler(samples).toDestination();
          reducer({ synthName: null, instrumentName: v });
        }}
      />
    </div>
  );

  const SetupButtons = () => (
    <div>
      <Button
        disabled={!state.rootNote}
        label='Generate Riff'
        onClick={() => {
          const { rootNote, scale, size } = state;
          const riff = Note.melody(rootNote, scale, size);
          reducer({ riff });
        }}
      />
    </div>
  );

  const SetupGuitar = () => (
    <Box direction='row' align='center' gap='medium'>
      <SetupFretboard />
      <SetupRiff />
      <SetupButtons />
    </Box>
  );

  return (
    <Box direction='column' align='center' gap='medium'>
      <SetupGuitar />
      <Fretboard />
      <RiffPlay />
      <RiffView />
    </Box>
  );
};
