import React from 'react'
import { useDispatch } from 'react-redux'
import { listButtonClick } from '../../store/actions'

const ListElementButton = ({ note, scale }) => {
  const dispatch = useDispatch()

  const clickHandler = ({ note, scale }) => {
    dispatch(listButtonClick({ note, scale }))
  }

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary"
      onClick={() => clickHandler({ note, scale })}
      key={key}
    >
      Play
    </button>
  )

}

export default ListElementButton