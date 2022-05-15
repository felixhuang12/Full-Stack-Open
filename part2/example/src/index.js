import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

//long hand - storing promise in variable is unnecessary
// const promise = axios.get('http://localhost:3001/notes')
// promise.then(response => {
//   console.log(response)
// })

//short hand
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(response)
//     console.log(notes)
// })

// not recommended -> move fetching to App.js
// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)