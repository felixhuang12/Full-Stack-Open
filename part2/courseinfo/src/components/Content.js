import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    const init = 0
    const copy = parts.map(part => part.exercises)
    const total = copy.reduce((prevValue, currValue) => prevValue + currValue, init)
    return (
      <div>
        {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
        <p>total: {total}</p>
      </div>
    )
}

export default Content