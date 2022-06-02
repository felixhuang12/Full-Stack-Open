import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const coords = country.capitalInfo.latlng
    const lat = coords[0]
    const lng = coords[1]
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`
    const [weatherData, setWeatherData] = useState(null)
    
    useEffect(() => {
        axios.get(link).then((res) => {
            setWeatherData(res.data)
        })
    }, [link])

    if (weatherData){
        return (
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature: {
                    Math.round((weatherData.main.temp - 273.15) * 100) / 100
                    } 
                    {'\u00B0'}C
                </p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                    alt='weather-icon'
                /> {weatherData.weather[0].description}
                <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
        )
    }

}

export default Weather