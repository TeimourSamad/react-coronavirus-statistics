import React, { useState, useEffect } from 'react'

const Main = () => {

    const [country, setCountry] = useState('-')
    const [deaths, setDeaths] = useState(0)
    const [confirmed, setConfirmed] = useState(0)
    const [info, setInfo] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        const fetchAPI = async () => {
            const response = await fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${info.charAt(0).toUpperCase() + info.slice(1)}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                    "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
                }
            })

            const data = await response.json()
            setConfirmed(data.data.confirmed)
            setDeaths(data.data.deaths)
            setCountry(data.data.location)
            setInfo('')
        }

        fetchAPI()
    }


    return (
        <div className='main-container'>
            <h1>React Coronavirus Statistics</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <input onChange={(e) => setInfo(e.target.value)} value={info} type='text' className='input' placeholder='Enter a country...' autoFocus />
            </form>
            <div className="results">
                <div className="country-container">
                    <label>Country</label>
                    <span>{country}</span>
                </div>
                <div className="deaths-container">
                    <label>Deaths</label>
                    <span>{deaths.toLocaleString()}</span>
                </div>
                <div className="confirmed-container">
                    <label>Confirmed</label>
                    <span>{confirmed.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
} 

export default Main