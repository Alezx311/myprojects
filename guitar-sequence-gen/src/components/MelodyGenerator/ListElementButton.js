const ListRowElementButton = ({ note, scale }) => {
  const clickHandler = ({ note, scale }) => {
    console.log(`Button for pattern with ${note} ${scale} pushed!`)
  }

  return <button onClick={clickHandler}>Play</button>
}

export default ListRowElementButton
