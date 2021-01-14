import React from 'react'
import { notes }
import ListElementButton from './ListElementButton'

const ListRow = ({ scale }) => (
  <button
    type="button"
    className="btn btn-sm btn-outline-primary"
    onClick={() => clickHandler({ note, scale })}
    key={key}
  >
    Play
  </button>
)

export default ListElementButton
