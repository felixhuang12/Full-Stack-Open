import React from 'react'

const Query = ({filter, setFilter}) => {
    return(
        <div> Find countries: 
            <input value={filter} onChange={setFilter}/>
        </div>
    )
}

export default Query