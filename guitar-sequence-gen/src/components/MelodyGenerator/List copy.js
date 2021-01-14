import React from 'react'
import ListHead from './ListHead'
import ListRow from './ListRow'


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
