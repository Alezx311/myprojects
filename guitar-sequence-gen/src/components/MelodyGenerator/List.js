import React from 'react'
import { ListHead, ListRows } from './ListElements'


const List = () => {
  return (
    <div className="container">
      <div className="col">
        <ListHead />
        <div className="list-group list-group-horizontal">
          <ListRows />
        </div>
      </div>
    </div>
  )
}

export default List
