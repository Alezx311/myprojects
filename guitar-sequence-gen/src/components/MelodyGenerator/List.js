import React from 'react'
import { ListHead, ListRows } from './ListElement'

const List = () => {
  return (
    <div className="container">
      <div className="col">
        <ListHead />
        <ListRows />
      </div>
    </div>
  )
}

export default List
