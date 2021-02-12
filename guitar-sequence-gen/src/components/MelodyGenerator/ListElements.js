import { notes, scales } from './MusicValues'
import ListElementButton from './ListElementButton'

export const ListButtons = ({ scale }) => {
  const dispatch = useDispatch()

  const clickHandler = ({ note, scale }) => {
    dispatch(listButtonClick({ note, scale }))
  }

  return MUSIC_VALUES.NOTES.map((note, key) => (
    
  ))
}
export const ListHead = () => {
  return (
    <ul className="list-group list-group-horizontal-sm">
      <div className="list-group-item flex-fill">SCALE / NOTE</div>
      {MUSIC_VALUES.NOTES.map((note, key) => (
        <div className="list-group-item flex-fill" key={key}>
          {note}
        </div>
      ))}
    </ul>
  )
}
export const ListRow = ({ scale }) => {
  return (
    <ul></ul>
  )
}
export const List = () => {
  return (
    <div><
  )
}
export const ListRows = () => {
  const dispatch = useDispatch()

  const clickHandler = ({ note, scale }) => {
    dispatch(listButtonClick({ note, scale }))
    dispatch(playPattern({ note, scale }))
  }

  return (
    <div className="col">
      {MUSIC_VALUES.SCALES.map((scale, key) => (
        <ul className="list-group list-group-horizontal-sm">
          <li className="list-group-item flex-fill">{scale}</li>
          {MUSIC_VALUES.NOTES.map((note, noteKey) => (
            <li
              type="button"
              className="list-group-item flex-fill btn btn-sm btn-outline-primary "
              onClick={() => clickHandler({ note, scale })}
              key={noteKey}
            >
              Play
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
