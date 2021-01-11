import React, { useState } from 'react'
import { randNumber } from './Helpers'
import classNames from 'classnames'

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
      const snake_body_coordinates = Array(initialState.snake_body_length)
        .fill(initialState.snake_body_coordinates)
        .map((val, ind) => val[0] + ind)
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
const checkCell = (x, y) => {}

const SnakeGameSettings = () => {
  const handleChangeSpeed = event => {}
  const handleStart = event => {}
  const handleReset = event => {}

  return (
    <div className="settingsBlock">
      <p className="blockTitle">SnakeGameSettings</p>
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
    <div>
      <p className="blockTitle">SnakeGameFruit</p>
    </div>
  )
}
const SnakeGameHead = () => {
  return (
    <div>
      <p className="blockTitle">SnakeGameHead</p>
    </div>
  )
}
const SnakeGameBody = () => {
  return (
    <div>
      <p className="blockTitle">SnakeGameBody</p>
    </div>
  )
}
const SnakeGameCell = () => {
  return <div className="cell"></div>
}
const SnakeGamePole = () => {
  const arr = Array(initialState.pole.size).fill(1)

  return (
    <div>
      <p className="game_pole">
        {arr.map((val, ind) => {
          return (
            <div className="row">
              {arr.map((val, ind) => {
                return <div className="cell"></div>
              })}
            </div>
          )
        })}
      </p>
    </div>
  )
}
const SnakeGame = () => {
  const [state, dispatch] = useState(reducer, initialState)
  const onKeyPressed = event => {
    // Пауза
    // if(event.keyCode ===)
    // Вверх
    if (event.keyCode === '38') {
      dispatch({
        type: 'SNAKE_MOVE',
        direction: 'UP'
      })
    }
    // Вниз
    if (event.keyCode === '40') {
      dispatch({
        type: 'SNAKE_MOVE',
        direction: 'DOWN'
      })
    }
    // Влево
    if (event.keyCode === '37') {
      dispatch({
        type: 'SNAKE_MOVE',
        direction: 'LEFT'
      })
    }
    // Вправо
    if (event.keyCode === '39') {
      dispatch({
        type: 'SNAKE_MOVE',
        direction: 'RIGht'
      })
    }
  }

  React.useEffect(() => {
    window.addEventListener('keyup', onKeyPressed, false)
  })

  return (
    <div>
      <p className="blockTitle">SnakeGame</p>
    </div>
  )
}
