import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
        .then(response => 
          setPersons(response)
        )
  }

  useEffect(hook, [])
  
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
      personService.create(personObj).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
    }
  }

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter(n => n.id !== id))
      setNewName('')
      setNewNumber('')
      setFilter('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filtChange={filtChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNum={newNumber}
      nameFormChange={nameFormChange} numFormChange={numFormChange}/>
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App