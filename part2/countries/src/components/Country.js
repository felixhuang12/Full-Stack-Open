import React from 'react'

const Country = ({country}) => {
    const languages = Object.values(country.languages)
    const flag = country.flags.png
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages:</h2>
            <ul>
                {languages.map(language => {
                    return(<li key={language}>{language}</li>)
                })}
            </ul>
            <img src={flag} alt='Flag' width='500' height='500' />
        </div>
    )
}

export default Country