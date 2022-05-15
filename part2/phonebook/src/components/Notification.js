import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message === 'Success'){
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
    return (
        <div className='error'>
            {message}
        </div>
    )
}

export default Notification