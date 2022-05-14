import React from 'react'
import Person from './Person'

const Persons = ({filter, persons}) => {
    if (filter !== ''){
      return(
        persons.filter(person => 
          person.name.toLowerCase().startsWith(filter.toLowerCase())).map(person => 
          <Person key={person.id} name={person.name} number={person.number} />
        )
      )
    }
    else {
      return(
        persons.map(person => 
            <Person key={person.id} name={person.name} number={person.number} />
        )
      )
    }
}

export default Persons