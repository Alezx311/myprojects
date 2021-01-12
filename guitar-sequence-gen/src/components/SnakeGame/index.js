import React, { useState } from 'react'
import { randNumber } from './Helpers'

const randCellCoordinate = () => [randNumber(initialState.POLE_SIZE), randNumber(initialState.POLE_SIZE)]
const initialState = {
  pole: {
    size: 25,
    isPaused: true,
    isStopped: false
  },
  snake: {
    position: [randCellCoordinate()]
  },
  fruit: {
    position: randCellCoordinate()
  },
  game: {
    speed: 4,
    points: 0,
    fruits_counter: 0,
    direction: 'right'
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GAME_START': {
      return { ...state }
    }
    case 'GAME_PAUSE': {
      return { ...state }
    }
    case 'GAME_OVER': {
      return { ...state }
    }
    case 'SNAKE_MOVE': {
      return { ...state }
    }
    default: {
      throw new Error(`Invalid values at reducer: ${(state, action)}`)
    }
  }
}

const SnakeGameSettings = () => {
  return (
    <div className="settingsBlock">
      <p className="blockTitle">Game Settings</p>
      <input
        label="Game Speed"
        min={1}
        max={10}
        step={1}
        onCLick={this.handleChangeSpeed}
        value={initialState.game_speed}
      />
      <button text="Start" onCLick={this.handleStart}></button>
      <button text="Reset" onCLick={this.handleReset}></button>
    </div>
  )
}
const SnakeGameStat = () => {
  return (
    <div className="statBlock">
      <p className="blockTitle">SnakeGameStat</p>
      <p className="points_stat">SnakeGameStat</p>
      <p className="fruit_stat">SnakeGameStat</p>
    </div>
  )
}
const SnakeGameFruit = () => {
  return (
    <div className="statBlock">
      <p className="blockTitle">SnakeGameStat</p>
      <p className="points_stat">SnakeGameStat</p>
      <p className="fruit_stat">SnakeGameStat</p>
    </div>
  )
}

const SnakeGamePole = () => {

  constructor(props) {
    this.state = { ...initialState }
  }

  const rows = Array(initialState.pole.size).fill(1)
  const Cell = (x, y) => <div className={`cell_${x}_${y}`} cell_type="empty"></div>
  const getCellType = (x, y) => document.querySelector(`cell_${x}_${y}`)?.getAttribute('cell_type') ?? false

  const eatFruit = () => {
    ++this.state.game.fruits_counter
    this.state.fruit = randCellCoordinate()
  }
  const gameOver = () => {}

  const checkMove = (x, y) => {
    const cellType = getCellType(x, y)
    if (cellType === 'empty') {
      return true
    }
    if (cellType === 'fruit') {
      eatFruit()
      return true
    }
    if (cellType === 'snake') {
      gameOver()
      return true
    } else {
      throw new Error(`Invalid cell coordinate ${(x, y)}`)
    }
  }

  return (
    <div>
      <p className="game_pole">Game Pole</p>
      {rows.map((row, x) => rows.map((cell, y) => Cell(x, y)))}
    </div>
  )
}
const SnakeGame = () => {
  const [state, dispatch] = useState(reducer, initialState)
  const onKeyPressed = event => {
    const buttonNames = {
      38: 'SNAKE_MOVE_UP',
      40: 'SNAKE_MOVE_DOWN',
      37: 'SNAKE_MOVE_LEFT',
      39: 'SNAKE_MOVE_RIGHT'
    }
    if (buttonNames[event.keyCode]) {
      dispatch({
        type: buttonNames[event.keyCode]
      })
    }
  }

  React.useEffect(() => {
    window.addEventListener('keyup', onKeyPressed, false)
  })

  return (
    <div>
      <p className="blockTitle">Snake Game</p>
      <div>
        <SnakeGameSettings />
        <SnakeGameStat />
        <SnakeGamePole />
      </div>
    </div>
  )
}

export default SnakeGame
