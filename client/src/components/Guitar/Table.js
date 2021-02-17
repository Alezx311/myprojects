import { Note } from '../helpers'

const getProps = props => ({ ...{ strings: 6, frets: 24, tuning: 'E Standart' }, ...props })

export const FretsRow = props => (
  <div {...props} className="string">
    {props.notes.map((note, key) => (
      <FretCell {...note} key={key} />
    ))}
  </div>
)

export const FretCell = props => {
  const onMouseEnter = () => console.log(props)
  const className = 'cell'

  return (
    <div {...props} className={className} onMouseEnter={onMouseEnter}>
      {props.note}
    </div>
  )
}

export const Table = customProps => {
  const props = getProps(customProps)
  const fretboardNotes = Note.buildFretboard(props).filter(Boolean)

  return (
    <div>
      {fretboardNotes.map((notes, key) => (
        <FretsRow notes={notes} key={key} />
      ))}
    </div>
  )
}

export default Table
