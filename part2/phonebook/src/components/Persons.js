import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, deletePerson}) => {
    if (filter !== ''){
      return(
        persons.filter(person => 
          person.name.toLowerCase().startsWith(filter.toLowerCase())).map(person => 
          <Person key={person.id} person={person} onDelete={deletePerson}/>
        )
      )
    }
    else {
      return(
        persons.map(person => 
            <Person key={person.id} person={person} onDelete={deletePerson} />
        )
      )
    }
}

export default Persons