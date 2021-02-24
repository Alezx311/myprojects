import { Text } from './Text'
import { NoteValues } from './NoteValues'
import { Interactive } from './Interactive'

export const UserSeeds = props => {
  return (
    <div className="container">
      <Text />
      <NoteValues />
      <Interactive />
    </div>
  )
}
