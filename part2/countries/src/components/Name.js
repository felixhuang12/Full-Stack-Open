import React from 'react'

const Name = ({country, setCountries}) => {
    return(
        <div>
            {country.name.common}
            <button onClick={() => {
                setCountries([country])
            }}>show</button>
        </div>
    )
}

export default Name