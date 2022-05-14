import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Query from './components/Query'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const data = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response[0].name.common)
    })
  }

  useEffect(data, [])

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      <Query filter={filter} setFilter={filterChange} />
    </div>
  )
}

export default App;
