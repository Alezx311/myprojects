import React from 'react'

import Setup from './Setup'
import View from './View'
import List from './List'
import Player from './Player'

const MelodyGenerator = () => (
  <div className="col">
    <div className="row">
      <Setup />
    </div>
    <div className="row">
      <Player />
    </div>
    <div className="row">{/* <View /> */}</div>
    <div className="row">
      <List />
    </div>
  </div>
)

export default MelodyGenerator
