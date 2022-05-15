import React from 'react'
import Name from './Name'
import Country from './Country'

const Display = ({countries, setCountries}) => {
    //console.log(countries);
    if (countries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length > 1){
        return(
            <div>
                {countries.map(country => {
                    return(
                        <Name key={country.name.common} name={country.name.common} />
                    )
                })}
            </div>
        )
    }
    else if (countries.length === 0){
        return(
            <div>No countries</div>
        )
    }
    else {
        return(
            <Country key={countries[0].name.common} country={countries[0]} />
        )
    }
}

export default Display