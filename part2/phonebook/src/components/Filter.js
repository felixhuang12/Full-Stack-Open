import React from 'react'

const Filter = ({filter, filtChange}) => {
    return (
      <div>filter shown with: <input value={filter} onChange={filtChange} /></div>
    )
}

export default Filter