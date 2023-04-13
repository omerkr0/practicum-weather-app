import { createContext, useContext, useState, useEffect } from 'react'
import data from '../data/cities.json'
import axios from 'axios'

// Create a new context object
const WeatherContext = createContext()

// Define a new provider component that will wrap the app
export const WeatherProvider = ({ children }) => {
  // Load the city data from a JSON file
  const cities = data
  // Set the default city to be Ankara
  const [city, setCity] = useState('Ankara')
  // Initialize an empty array to hold weather data
  const [weatherData, setWeatherData] = useState([])

  // Use the useEffect hook to load weather data for the selected city
  useEffect(() => {
    // Find the selected city in the list of cities
    let selectCities = data.filter((item) => item.name === city)[0]
    // Set the API key to use for fetching weather data
    let key = '7c5a6c997fbf405982b225023231304'

    // Use Axios to fetch weather data from the API
    axios(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectCities.latitude},${selectCities.longitude}&days=8&hour=24`,
    )
      .then((res) => res.data)
      // Extract the forecast data from the response
      .then((res) => res.forecast)
      // Extract the forecast days from the forecast data
      .then((res) => setWeatherData(res.forecastday))
  }, [city])

  // Define the values to provide through the context
  const values = {
    cities,
    city,
    setCity,
    weatherData,
  }

  // If weather data is still being loaded, show a loading message
  if (weatherData.length === 0) {
    return <div>Loading...</div>
  }

  // Return the provider component, passing in the values through the context
  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  )
}

// Define a custom hook to easily access the values provided through the context
export const useWeatherContext = () => useContext(WeatherContext)
