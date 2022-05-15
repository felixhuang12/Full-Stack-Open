import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Query from './components/Query'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  const data = () => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setAllCountries(res.data)
    })
  }

  useEffect(data, [])

  const filterChange = (event) => {
    setFilter(event.target.value)
    if (filter){
    const regex = new RegExp( filter, 'i' );
    const filteredCountries = () => 
      allCountries.filter(country => 
        country.name.common.match(regex)
      )
    setCountries(filteredCountries)
    }
  }

  return(
    <div>
      <Query filter={filter} setFilter={filterChange} />
      <Display countries={countries} />
    </div>
  )
}

export default App;
