import React from 'react'
import ReactJson from 'react-json-view'
import { ListGroup } from 'react-bootstrap'

export const classNames = {
  generated: 'generated',
  text: 'text-center align-middle',
  inputGroup: 'input-group mb-3',
  label: 'form-label'
}
export const defaultProps = {
  className: classNames.generated,
  value: null,
  text: null,
  htmlFor: null,
  key: null
}

export const showArray = arr => (
  <ListGroup>
    <ListGroup.Item>
      <span>Array:</span>
    </ListGroup.Item>
    {arr.map((val, key) => (
      <ListGroup.Item>
        <span key={key}>{val}</span>
      </ListGroup.Item>
    ))}
  </ListGroup>
)
export const showObject = obj => <ReactJson src={obj} />

const ReactHelpers = { classNames, defaultProps, showArray, showObject }
export default ReactHelpers
