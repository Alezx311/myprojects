// Кнопка таблицы
const ExampleTableButton = ({ note, scale }) => {
  const handleExampleButtonClick = ({ note, scale }) => {
    console.log(`Button with ${note} on ${scale} scale was clicked!`)
  }

  return <div className="exampleButton" onClick={() => handleExampleButtonClick({ note, scale })}></div>
}
// Таблица 12 (ноты) * 10 (гаммы)
const ExampleNoteList = ({ notesArray }) => {
  return (
    <ul>
      {notesArray.map(note => (
        <li>
          <p>{note}</p>
          {scalesArray.map(scale => ExampleTableButton({ note, scale }))}
        </li>
      ))}
    </ul>
  )
}
