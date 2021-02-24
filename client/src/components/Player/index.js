import React from 'react'
import * as Tone from 'tone'
import { SYNTHS, NOTES, INSTRUMENTS } from '../constants'
import { Note, Random } from '../helpers'

// ! Формально КА определяется как пятёрка:

// {\displaystyle A=(S,X,Y,\delta ,\lambda ),}{\displaystyle A=(S,X,Y,\delta ,\lambda ),}
// где {\displaystyle S}S — конечное множество состояний автомата;
// {\displaystyle X,Y}X,Y — конечные входной и выходной алфавиты соответственно, из которых формируются строки, считываемые и выдаваемые автоматом;
// {\displaystyle \delta :S\times X\rightarrow S}\delta :S\times X\rightarrow S — функция переходов;
// {\displaystyle \lambda :S\times X\rightarrow Y}\lambda :S\times X\rightarrow Y — функция выходов.
// Абстрактный автомат с некоторым выделенным состоянием {\displaystyle s_{0}),}{\displaystyle s_{0}),}, это состояние называют начальным состоянием, называется инициальным автоматом. Так как каждый КА имеет конечное число состояний, и любое из его состояний может быть назначено начальным состоянием, одному и тому же автомату соответствует {\displaystyle N}N инициальных автоматов, {\displaystyle N}N — число внутренних состояний КА. Таким образом, абстрактный КА определяет семейство инициальных автоматов. Если не указано начальное состояние, то поведение автомата всегда недетерминировано, выходное слово автомата зависит от начального состояния, поэтому полное детерминированное описание автомата будет[1]:

// {\displaystyle A=(S,X,Y,\delta ,\lambda ,s_{0}).}{\displaystyle A=(S,X,Y,\delta ,\lambda ,s_{0}).}
// Различают два класса КА: автоматы Мура — КА, у которых выходной сигнал зависит только от внутреннего состояния, по рисунку у автомата Мура нет связи от входа {\displaystyle x(t)}x(t) к функции выхода {\displaystyle \lambda }\lambda  и автоматы Мили — выходной сигнал зависит как от внутреннего состояния, так и от состояния входа.

//! {\displaystyle M=(V,Q,q_{0},F,\delta ),}

// где {\displaystyle V}V — входной алфавит (конечное множество входных символов), из которого формируются входные слова, воспринимаемые конечным автоматом;
// {\displaystyle Q}Q — множество внутренних состояний;
// {\displaystyle q_{0}}q_{0} — начальное состояние {\displaystyle (q_{0}\in Q)}(q_{0}\in Q);
// {\displaystyle F}F — множество заключительных, или конечных состояний {\displaystyle (F\subset Q)}(F\subset Q);
// {\displaystyle \delta }\delta  — функция переходов, определённая как отображение {\displaystyle \delta \colon Q\times (V\cup \{\varepsilon \})\rightarrow Q}{\displaystyle \delta \colon Q\times (V\cup \{\varepsilon \})\rightarrow Q}, такое, что {\displaystyle \delta (q,a)=\{r\colon q\,\,{\underset {a}{\to }}\,\,r\}}{\displaystyle \delta (q,a)=\{r\colon q\,\,{\underset {a}{\to }}\,\,r\}}, то есть значение функции переходов на упорядоченной паре (состояние, входной символ или пустая цепочка символов) есть множество всех состояний, в которые из данного состояния возможен переход по данному входному символу или пустой цепочке символов, обычно обозначаемой буквой {\displaystyle \varepsilon .}\varepsilon .
// При анализе КА принято полагать, что конечный автомат начинает работу в некотором начальном состоянии {\displaystyle q_{0}}q_{0}, последовательно получает по одному символу из входного слова (цепочки входных символов). Считанный символ может перевести автомат в новое состояние или не перевести в новое состояние в соответствии с функцией переходов.

// Получая входную цепочку символов {\displaystyle x}x и делая переходы из состояния в состояние, автомат после получения последнего символа[прояснить]. входного слова окажется в некотором состоянии {\displaystyle q'}{\displaystyle q'}.

// Если это состояние является заключительным, то говорят, что автомат допустил слово {\displaystyle x}x[прояснить]

const SoundExampleButtons = props => {
  const { synth, synthName } = props

  const play = (note, duration = '4n', time = Tone.now(), velocity = Math.random()) => {
    if (!note) return false
    synth.triggerAttackRelease(note, duration, time, velocity)
  }
  const playMany = (time, note) => play(note, '4n', time)
  const Button = props => <button className="btn btn-primary" {...props}></button>
  const ButtonExampleNote = props => {
    const { note } = props
    const onClick = () => play(note)

    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }
  const ButtonExampleChord = props => {
    const { note } = props
    const onClick = note => {
      const chordNotes = Note.loadChord(note)
      const chordTrack = new Tone.Part(playMany, chordNotes)

      Tone.Transport.start('+1')
    }
    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }
  const ButtonExampleMelody = props => {
    const { note } = props
    const onClick = note => {
      const scaleNotes = Note.loadScale(note)
      const melodyNotes = Random.values(scaleNotes, 20)
      const melodyTrack = new Tone.Sequence(playMany, melodyNotes)

      Tone.Transport.start('+1')
    }
    return (
      <Button note={note} onClick={onClick}>
        {note}
      </Button>
    )
  }

  return (
    <div className="btn-group">
      {NOTES.map(noteChar => `${noteChar}4`).map(note => (
        <div key={note}>
          <ButtonExampleNote note={note} />
          <ButtonExampleChord note={note} />
          <ButtonExampleMelody note={note} />
        </div>
      ))}
    </div>
  )
}
