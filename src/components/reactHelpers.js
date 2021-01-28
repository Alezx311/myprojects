import React from 'react'
import ReactJson from 'react-json-view'

export const classNames = {
  text: 'text-center align-middle',
  inputGroup: 'input-group mb-3'
}

export const JsonBlock = obj => <ReactJson src={obj} />
export const TextBlock = ({ text = '' }) => <div className={classNames.text}>{text}</div>
export const LabelBlock = ({ labelId = Math.random(), text = '' }) => (
  <label htmlFor={labelId} className="form-label">
    {text}
  </label>
)
