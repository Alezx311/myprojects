import React from 'react'
import { Song, Track, Instrument, Effect } from 'reactronica'

export const ReactMusicExample = () => {
  return (
    // Top level component must be Song, with Tracks nested inside
    <Song bpm={90} isPlaying={true}>
      <Track
        // Array of several types
        steps={[
          // Note in string format
          'C3',
          // Object with note name and duration
          { name: 'C3', duration: 0.5 },
          { name: 'D3', duration: 0.5 },
          // Array of strings for chords
          ['C3', 'G3'],
          null,
          null,
          // Array of objects for chords
          [
            { name: 'C3', duration: 0.5 },
            { name: 'G3', duration: 0.5 }
          ],
          null
        ]}
        volume={80}
        pan={0}
        // Callback for every tick
        onStepPlay={(step, index) => {
          doSomething(step, index)
        }}
      >
        <Instrument type="synth" />
        {/* Add effects chain here */}
        <Effect type="feedbackDelay" />
        <Effect type="distortion" />
      </Track>

      <Track>
        <Instrument
          type="sampler"
          samples={{
            C3: 'path/to/kick.mp3',
            D3: 'path/to/snare.mp3',
            E3: 'path/to/hihat.mp3'
          }}
          // Add some notes here to play
          notes={[{ name: 'C3' }]}
        />
      </Track>
    </Song>
  )
}