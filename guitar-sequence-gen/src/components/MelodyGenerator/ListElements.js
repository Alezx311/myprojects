import React from 'react'
import { MUSIC_VALUES } from './Helpers'
import { useDispatch, useSelector } from 'react-redux'
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
    <div className="list-group list-group-horizontal">
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
  const state = useSelector(state => state)

  const clickHandler = data => {
    dispatch(actions.generatePattern(data))

    if (state.isPlaying) {
      dispatch(actions.playerPause())
      if (state.note === data.note && state.scale === data.scale) {
        return true
      }
    }

    dispatch(actions.playerPlay())
  }

  return MUSIC_VALUES.SCALES.map((scale, key) => (
    <div className="list-group list-group-horizontal" key={key}>
      <div className="list-group-item " style={styles.first}>
        {scale}
      </div>
      {MUSIC_VALUES.NOTES.map((note, notekey) => (
        <button
          className="list-group-item fas fa-play btn btn-success"
          style={styles.element}
          onClick={() => clickHandler({ note, scale })}
          key={notekey}
        ></button>
      ))}
    </div>
  ))
}
