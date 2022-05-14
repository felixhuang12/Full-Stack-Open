import React from 'react'

const PersonForm = ({addPerson, newName, newNum, nameFormChange, numFormChange}) => {
    return (
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={nameFormChange}/></div>
        <div>number: <input value={newNum} onChange={numFormChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
    
}

export default PersonForm