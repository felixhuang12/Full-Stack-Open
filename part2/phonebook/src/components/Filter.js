import React from 'react'

const Filter = ({filter, filtChange}) => {
    return (
      <div>Filter by name: <input value={filter} onChange={filtChange} /></div>
    )
}

export default Filter