import React from 'react'
import Setup from './Setup'
import View from './View'
import Player from './Player'
import List from './List'

const MelodyGenerator = () => {
  return (
    <div className="col">
      <div className="row">
        <Setup />
      </div>
      <div className="row">
        <View />
      </div>
      <div className="row">
        <Player />
      </div>
      <div className="row">
        <List />
      </div>
    </div>
  )
}

export default MelodyGenerator
