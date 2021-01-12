import { MUSIC_VALUES } from './Helpers'
import { useDispatch } from 'react-redux'
import { listButtonClick } from '../../store/actions'

export const ListButtons = ({ scale }) => {
  const dispatch = useDispatch()

  const clickHandler = ({ note, scale }) => {
    dispatch(listButtonClick({ note, scale }))
  }

  return (
    <li className="list-group-item">
      {MUSIC_VALUES.NOTES.map((note, key) => (
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => clickHandler({ note, scale })}
          key={key}
        >
          {`${note} ${scale}`}
        </button>
      ))}
    </li>
  )
}
export const ListHead = () => {
  return (
    <ul className="list-group list-group-horizontal">
      {MUSIC_VALUES.NOTES.map((note, key) => (
        <div className="list-group-item" key={key}>
          {note}
        </div>
      ))}
    </ul>
  )
}
export const ListRows = () => {
  return (
    <div className="list-group-item">
      {MUSIC_VALUES.SCALES.map((scale, key) => (
        <ListButtons scale={scale} key={key} />
      ))}
    </div>
  )
}
