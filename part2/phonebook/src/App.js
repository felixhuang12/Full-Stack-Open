import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const filtChange = (event) => {
    setFilter(event.target.value)
  }

  const nameFormChange = (event) => {
    setNewName(event.target.value)
  }

  const numFormChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber, 
      id: persons.length+1
    }
    let checker = true
    persons.forEach(obj => personObj.number !== obj.number ? checker = false : checker = true)
    if (checker) {
      alert(`A person with phone number ${newNumber} is already in the phonebook.`)
    }
    else {
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
      setFilter('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filtChange={filtChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNum={newNumber}
      nameFormChange={nameFormChange} numFormChange={numFormChange}/>
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App