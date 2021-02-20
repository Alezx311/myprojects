import { NOTES, SCALES } from '../constants'
import { Note, Random } from '../helpers'

export const Riff = props => {
  return (
    <div className="container">
      <p>Riff</p>
      <div {...props}></div>
    </div>
  )
}
