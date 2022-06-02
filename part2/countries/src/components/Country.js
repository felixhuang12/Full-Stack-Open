import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
    const languages = Object.values(country.languages)
    const flag = country.flags.png
    const capital = country.capital[0]

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => {
                    return(<li key={language}>{language}</li>)
                })}
            </ul>
            <img src={flag} alt='Flag' width='250' height='250' />
            <Weather country={country} />
        </div>
    )
}

export default Country