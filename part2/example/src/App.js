import { useState } from 'react'
import Note from './components/Note' // location given in relation to importing file (e.g. App.js in this case)
// https://fullstackopen.com/en/part1/component_state_event_handlers#destructuring
const App = (props) => { 
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  
  // addNote is event handler
  const addNote = (event) => {
    event.preventDefault() // prevents default action of submitting a form; page would otherwise reload among other things
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
  
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  // event handler for changes in input
  const handleNoteChange = (event) => {
    // no event.preventDefault() bc no default action occurs on input change
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
      {notesToShow.map(note => // forEach note, put note.content in <li></li> tags
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div> // wrapped in curly braces b/c function parameter passsed to map method is used to create view elements
  )
}

export default App