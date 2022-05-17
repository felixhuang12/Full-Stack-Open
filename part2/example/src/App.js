import { useState, useEffect} from 'react'
import Note from './components/Note' // location given in relation to importing file (e.g. App.js in this case)
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>©2022</em>
    </div>
  )
}

const App = () => { 
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')
//output ^ ::
//render 0 notes // printed first time component is rendered
// effect // body of function useEffect is immediately executed after rendering
// promise fulfilled // printed after data arrives from server
// render 3 notes // setNotes() updates state of notes -> triggers rerendering of component
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    // notes.map() returns copy of array where old items are same
    // with the wanted note of specified ID changed
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  // addNote is event handler
  const addNote = (event) => {
    event.preventDefault() // prevents default action of submitting a form; page would otherwise reload among other things
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
      })
  }
  // event handler for changes in input
  const handleNoteChange = (event) => {
    // no event.preventDefault() bc no default action occurs on input change
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
      {notesToShow.map(note => // forEach note, put note.content in <li></li> tags
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div> // wrapped in curly braces b/c function parameter passsed to map method is used to create view elements
  )
}

export default App