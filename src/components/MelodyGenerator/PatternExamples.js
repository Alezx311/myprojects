import React from 'react'

export const PatternElement = ({ notes, title = '' }) => {
  const clickHandler = e => {
    console.log('Play ', notes, title)
  }

  return (
    <div>
      <span className="text-center align-middle">{title}</span>
      <br />
      <span className="text-center align-middle">{notes.join(' -> ').trim()}</span>
      <br />
      <button onClick={clickHandler}>Play</button>
    </div>
  )
}
