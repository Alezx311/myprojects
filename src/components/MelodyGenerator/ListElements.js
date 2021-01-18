import React from 'react'
import { MUSIC_VALUES } from './Helpers'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const styles = {
  first: {
    min_width: '200px',
    width: '200px'
  },
  element: {
    min_width: '50px',
    width: '50px',
    min_height: '50px',
    height: '50px'
  }
}

export const ListHead = () => {
  return (
    <div className="list-group list-group-horizontal mx-auto">
      <div className="list-group-item" style={styles.first}>
        NOTES / SCALES
      </div>
      {MUSIC_VALUES.NOTES.map((note, key) => (
        <div className="list-group-item" key={key} style={styles.element}>
          {note}
        </div>
      ))}
    </div>
  )
}
export const ListRows = () => {
  const dispatch = useDispatch()

  const clickHandler = data => {
    dispatch(actions.playerPause())
    dispatch(actions.generatePattern(data))
    dispatch(actions.playerPlay())
  }

  return MUSIC_VALUES.SCALES.map((scale, key) => (
    <div className="list-group list-group-horizontal mx-auto" key={key}>
      <div className="list-group-item " style={styles.first}>
        {scale}
      </div>
      {MUSIC_VALUES.NOTES.map((note, notekey) => (
        <button
          className="list-group-item fas btn btn-success fas fa-play"
          style={styles.element}
          onClick={() => clickHandler({ note, scale })}
          key={notekey}
        ></button>
      ))}
    </div>
  ))
}
