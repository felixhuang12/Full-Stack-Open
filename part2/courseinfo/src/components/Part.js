import React from 'react'

const Part = (props) => {
    return (
      <p>
        {props.part}: {props.exercises} exercises
      </p>
    )
}

export default Part