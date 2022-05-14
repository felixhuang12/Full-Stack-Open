import React from 'react'
// import { useState} from 'react'
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part}: {props.exercises} exercises
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

// ReactDOM.render(<App />, document.getElementById('root'))

export default App

// ==================== EXAMPLE of useState
// import React, { useState } from 'react'
// const App = () => {
//   const [ counter, setCounter ] = useState(0) // set initial state of counter to 0
// ====== via destructuring
// by default, useState returns two values; second being a function that modifies the first
// setCounter set to the modifier function

//   const increaseByOne = () => setCounter(counter + 1) // counter = counter + 1
//   const decreaseByOne = () => setCounter(counter - 1) // counter = counter - 1
//   const setToZero = () => setCounter(0) // counter = 0

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button
//         onClick={increaseByOne}
//         text='plus'
//       />
//       <Button
//         onClick={setToZero}
//         text='zero'
//       />     
//       <Button
//         onClick={decreaseByOne}
//         text='minus'
//       />           
//     </div>
//   )
// }

// =============== ARRAY EXAMPLE
// const History = (props) => {
//   if (props.allClicks.length === 0) { // conditional rendering
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//==== strings joined into single string separate by space
//     </div>
//   )
// }

// const Button = ({ handleClick, text}) => {
//   <button onClick={handleClick}>
//     {text}
//   </button>
// }
//
// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R')) // concat creates a new copy of array; don't use push() as it modifies current state
//     setRight(right + 1)
//   }

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left' />
//       <Button handleClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }
// ================== DEBUGGING
// const Button = (props) => { 
//   console.log(props) // print variables to see what's going on
//   const { onClick, text } = props
//   return (
//     <button onClick={onClick}>
//       {text}
//     </button>
//   )
// }
// ================== Event handling: function returning a another function example
// const App = () => {
//   const [value, setValue] = useState(10)
  
//   const setToValue = (newValue) => () => {
//     console.log('value now', newValue)  // print the new value to console
//     setValue(newValue)
//   }
  
//   return (
//     <div>
//       {value}
//       <button onClick={setToValue(1000)}>thousand</button>
//       <button onClick={setToValue(0)}>reset</button>
//       <button onClick={setToValue(value + 1)}>increment</button>
//     </div>
//   )
// }

// ================== Event handling: passing event handlers to Child Components
// const Display = props => <div>{props.value}</div>

// const Button = (props) => (
//   <button onClick={props.handleClick}>
//     {props.text}
//   </button>
// )

// const App = () => {
//   const [value, setValue] = useState(10)

//   const setToValue = newValue => {
//     console.log('value now', newValue)
//     setValue(newValue)
//   }

//   return (
//     <div>
//       <Display value={value} />
//       <Button handleClick={() => setToValue(1000)} text="thousand" />
//       <Button handleClick={() => setToValue(0)} text="reset" />
//       <Button handleClick={() => setToValue(value + 1)} text="increment" />
//     </div>
//   )
// }

// =============== Complex State syntax
// const handleLeftClick = () => {
//   const newClicks = { 
//     ...clicks, //create copy of clicks object with same properties
//     left: clicks.left + 1 // except increment left property by one
//   }
//   setClicks(newClicks)
// }

// const handleRightClick = () => {
//   const newClicks = { 
//     ...clicks, 
//     right: clicks.right + 1 
//   }
//   setClicks(newClicks)
// }