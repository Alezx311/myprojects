import React from 'react'
import { NOTES, SCALES_SHORT } from './Helpers'
import { updateSound, updatePlayer } from '../../store/actions'
import { useDispatch } from 'react-redux'

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
  },
  classNames: {
    first: 'list-group-item',
    element: 'list-group-item',
    container: 'list-group-horizontal mx-auto'
  }
}

const ListRowLabel = ({ label }) => (
  <div className="list-group-item text-center" style={styles.first}>
    <strong>
      <em>{label}</em>
    </strong>
  </div>
)

const ListHead = () => {
  return (
    <div className="list-group list-group-horizontal mx-auto">
      <ListRowLabel label="NOTES / SCALES" />
      {NOTES.map((note, key) => (
        <div className="list-group-item text-center" key={key} style={styles.element}>
          <strong>{note}</strong>
        </div>
      ))}
    </div>
  )
}
export const ListRows = () => {
  const dispatch = useDispatch()

  const onClick = ({ note, scale }) => {
    dispatch(updateSound({ key: note, scale }))
    dispatch(updatePlayer('Play'))
  }
  return SCALES_SHORT.map((scale, key) => (
    <div className="list-group list-group-horizontal mx-auto" key={key}>
      <ListRowLabel label={scale} />
      {NOTES.map((note, noteKey) => (
        <button
          key={noteKey}
          className="list-group-item fas btn btn-success fas fa-play"
          style={styles.element}
          onClick={() => onClick({ note, scale })}
        >
          {(note, scale)}
        </button>
      ))}
    </div>
  ))
}

const List = () => {
  return (
    <div className="container mt-5">
      <ListHead />
      <ListRows />
    </div>
  )
}

export default List
