import { Player } from './Player'
import { Drawer } from './Drawer'
import { Guitar } from './Guitar'
import { Riffs } from './Riffs'
import { UserSeeds } from './UserSeeds'

export const Main = props => {
  return (
    <div className="container container-fluid">
      <Player />
      <Drawer />
      <Guitar />
      <Riffs />
      <UserSeeds />
    </div>
  )
}
