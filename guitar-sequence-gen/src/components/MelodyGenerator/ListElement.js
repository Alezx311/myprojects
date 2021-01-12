import { MUSIC_VALUES } from './Helpers'

export const ListButtons = ({ scale }) => {
  return MUSIC_VALUES.NOTES.map(note => (
    <button className="list-group-item btn btn-info" onClick={() => console.log(note, scale)}>
      {`${note} ${scale}`}
    </button>
  ))
}
export const ListHead = () => {
  return (
    <ul className="list-group list-group-horizontal">
      {MUSIC_VALUES.NOTES.map(note => (
        <div className="list-group-item">{note}</div>
      ))}
    </ul>
  )
}
export const ListRows = () => {
  return (
    <ul className="list-group list-group-horizontal">
      {MUSIC_VALUES.SCALES.map(scale => (
        <div className="list-group-item row">
          <ListButtons scale={scale} />
        </div>
      ))}
    </ul>
  )
}
