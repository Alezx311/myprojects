import { Box,  } from 'grommet';
import { Random } from 'jsuseful';
import { NOTES, SCALES, INITIAL_STATE } from './constants';

// Изменение параметров генерации
export function MelodySetup() {
  // melodyKey: 'C',
  // // мин и макс октавы при генерации
  // minOctave: 2,
  // maxOctave: 6,
  // // размер паттерна (4 четвертные ноты)
  // PatternSize: 4,
  // // количество паттернов в мелодии (4 типа паттернов должны образовать замыкающуюся мелодию)
  // melodySize: 4,
  // // удары в секунду
  // melodyBpm: 120,
  // // гамма
  // melodyScale: 'minor',
  // // при синтезации звука
  // melodySynthName: 'PolySynth',
  // // при использовании семплов
  // melodyInstrumentName: 'guitar-acoustic',
  // // максимум инструментов звучащих одновременно
  // melodyMaxVoices: 4,
  // // использовать текст в качестве зерна для генерации нот
  // melodySourceText: null,
  const onChangeKey = () => {};
  const onChangeScale = () => {};
  const onChangeSize = () => {};
  // ...

  return <div>MelodySetup</div>;
}
// Запустить генерацию заново
export function MelodyGenerateButton() {
  const onClick = () => {};

  return <div>MelodyGenerateButton</div>;
}
// Остановить или запустить проигрывание
export function MelodyPlayPauseButton() {
  const onClick = () => {};

  return <div>MelodyPlayPauseButton</div>;
}
// Показ текущих нот в виде текста, в будущем добавить перевод с сольресоля, показ для гитары и тд
export function MelodyVisualize() {
  return <div>MelodyVisualize</div>;
}

export function ExampleMelody() {
  const options = {};

  return (
    <>
      <MelodySetup />
      <MelodyGenerateButton />
      <MelodyPlayPauseButton />
      <MelodyVisualize />
    </>
  );
}
export function ExampleTranslate() {
  const options = {};

  return (
    <>
      <TranslateSetup />
      <TranslateInput />
      <TranslateResult />
    </>
  );
}

// Настройки перевода(язык, исключить слова, форматирование и тд..)
export function TranslateSetup() {
  return <div>TranslateSetup</div>;
}
// Ввод текста для перевода, текст на русском, английском, или ноты в стандартной нотации (ABCDEFG)
export function TranslateInput() {
  return <div>TranslateInput</div>;
}
// Вывод результата
export function TranslateResult() {
  return <div>TranslateResult</div>;
}

export function Examples() {
  return (
    <Box>
      <ExampleMelody />
      <ExampleTranslate />
    </Box>
  );
}
