import React from 'react'
import * as Tone from 'tone'
import Visualize from './Visualize'
import { TONE_SYNTHS, NOTE_CHARS, SCALE_NAMES, TONE_INSTRUMENT_NAMES } from '../constants'
import { Note, Random } from '../helpers'

// const Show = ({ synth, name, ...props }) => {
//   const player = {
//     sequence: false,
//     lastUpdate: false,
//     duration: '8n',
//     showLogValue: ``,
//     showLogId: `player_log_container_id`
//   }
//   return (
//     <div className="container">
//       <div className="subtitle">Player Logs:</div>
//       <span className="text-center" value={player.showLogValue} id={player.showLogId}></span>
//     </div>
//   )
// }
// const PlayerControls = ({ synth, name, ...props }) => {
//   const values = { time: Tone.now(), duration: '8n', velocity: 1 }

//   const play = ({ time, note, ...opt }) => {
//     const duration = opt?.duration ?? values.duration
//     const velocity = opt?.velocity ?? Math.random()
//     synth.triggerAttackRelease(note, duration, time, velocity)
//   }
//   const generate = ({ char, size, ...opt }) => {
//     const notes = Note.generate({ char, size, ...opt })
//     playSequence({ notes, ...opt })
//   }
//   const playSequence = ({ notes, ...opt }) => {
//     const sequence = new Tone.Sequence((time = Tone.now(), { note, duration, ...noteValues }) => {
//       play({ note, duration, ...noteValues })
//     }, notes).set({ humanize: true, probability: 1, playbackRate: 1 })

//     Tone.Transport.start(0)
//     sequence.start('+1')

//     return sequence
//   }
// }

const NoteButtons = ({ synth, name }) => {
  const playNote = note => {
    synth.triggerAttackRelease(note, '8n', Tone.now())
  }

  const playNotes = (note, size) => {
    const { text, color, octave, ...values } = Note.loadNoteFull(note)
    const scaleNotes = Note.loadScale(text, 'minor').map(v => `${v}${octave}`)
    const shuffles = Random.arrayShuffles(scaleNotes)
    const sequenceNotes = Random.values(shuffles, size)

    const sequence = new Tone.Sequence((time = Tone.now(), note) => {
      synth.triggerAttackRelease(note, '8n', time, Math.random())
    }, sequenceNotes).set({ humanize: true, probability: 1, playbackRate: 1 })

    Tone.Transport.start(0)
    sequence.start('+1')

    return sequence
  }
  const playPi = () => {
    const piFull = `31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482 1339360726 0249141273 7245870066 0631558817 4881520920 9628292540 9171536436 7892590360 0113305305 4882046652 1384146951 9415116094 3305727036 5759591953 0921861173 8193261179 3105118548 0744623799 6274956735 1885752724 8912279381 8301194912 9833673362 4406566430 8602139494 6395224737 1907021798 6094370277 0539217176 2931767523 8467481846 7669405132 0005681271 4526356082 7785771342 7577896091 7363717872 1468440901 2249534301 4654958537 1050792279 6892589235 4201995611 2129021960 8640344181 5981362977 4771309960 5187072113 4999999837 2978049951 0597317328 1609631859 5024459455 3469083026 4252230825 3344685035 2619311881 7101000313 7838752886 5875332083 8142061717 7669147303 5982534904 2875546873 1159562863 8823537875 9375195778 1857780532 1712268066 1300192787 6611195909 2164201989`
    const piShort = `3141592653589793238462643`

    const sequenceNotes = piFull.split('').map(piChar => {
      const seed = NOTE_CHARS[piChar] ? 'Pi Number' : 'Random'
      const piNumber = NOTE_CHARS[piChar] ? piChar : Random.number(0, 10)
      const char = NOTE_CHARS[piNumber]
      const octave = Math.random() > 0.5 ? 3 : 4
      const note = `${char}${octave}`
      const duration = Random.arrayElement(['4n', '8n'])
      // const duration = '8n'
      const velocity = Math.random()

      return { seed, piNumber, note, duration, velocity }
    })

    const sequence = new Tone.Sequence(
      (time = Tone.now(), { note, duration, velocity, seed, piNumber }) => {
        console.log(`${seed} -> ${piNumber} -> ${note}${duration}${velocity}`)
        synth.triggerAttackRelease(note, duration, time, velocity)
      },
      sequenceNotes,
      '8n'
    ).set({ humanize: true, probability: 0.9, playbackRate: 1.5 })

    Tone.Transport.start(0)
    sequence.start('+1')

    return sequence
  }

  const PlayNote = ({ note, ...props }) => (
    <button
      type="button"
      className="btn btn-sm btn-outline-success m-1"
      onClick={() => {
        playNote(note)
      }}
      {...props}
    >
      {note}
    </button>
  )
  const PlayPi = ({ note, ...props }) => (
    <button
      type="button"
      className="btn btn-sm btn-outline-success m-1"
      onClick={() => {
        playPi()
      }}
      {...props}
    >
      Play Pi
    </button>
  )
  const PlayNotes = ({ note, size, text, ...props }) => (
    <button
      type="button"
      className="btn btn-sm btn-outline-success m-1"
      onClick={() => {
        playNotes(note, size)
      }}
      {...props}
    >
      {text ?? note}
    </button>
  )

  return (
    <div className="container">
      <div className="btn-group" role="group">
        {NOTE_CHARS.map(char => `${char}4`).map((note, key) => (
          <>
            <PlayPi />
            <PlayNote note={note} key={key} />
            <PlayNotes note={note} size={50} text="Long" />
          </>
        ))}
      </div>
    </div>
  )
}

const Synths = props => {
  const synths = TONE_SYNTHS.map(name => ({ name, synth: new Tone[name]().toDestination() }))

  return synths.map(({ synth, name }, key) => (
    <div className="card shadow-lg bg-light bg-gradient m-3" key={key}>
      <div className="card-body text-center">
        <h6 className="fw-bold fst-italic">{name}</h6>
        <div className="row">
          <NoteButtons synth={synth} />
        </div>
      </div>
    </div>
  ))
}

const Instruments = props => {
  return (
    <div className="container">
      {TONE_INSTRUMENT_NAMES.map((value, key) => (
        <div key={key} value={value}>
          {value}
        </div>
      ))}
    </div>
  )
}

export const Player = props => {
  return (
    <div className="container container-fluid">
      <Visualize />
      <Synths />
      <Instruments />
    </div>
  )
}

export default Player
