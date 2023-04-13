import React from 'react'
import { Dropdown, InputGroup, FormControl } from 'react-bootstrap'
import { useWeatherContext } from '../context/WeatherContext'
import '../App.css'

function DropDown() {
  // Get the city, setCity, and cities values from the WeatherContext using the useWeatherContext hook
  const { city, setCity, cities } = useWeatherContext()

  // Define a function to handle changes in the input field
  const handleInputChange = (event) => {
    setCity(event.target.value)
  }

  // Render a dropdown menu and an input field
  return (
    <div className="header">
      <InputGroup className="mb-3">
        {/* Render a dropdown button */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {city}
          </Dropdown.Toggle>

          {/* Render dropdown items for each city in the cities array */}
          <Dropdown.Menu>
            {cities.map((item) => (
              <Dropdown.Item key={item.id} onClick={() => setCity(item.name)}>
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Render an input field to enter a city name */}
        <FormControl
          placeholder="Enter a city"
          aria-label="City"
          aria-describedby="basic-addon2"
          value={city}
          onChange={handleInputChange}
          disabled
        />
      </InputGroup>
    </div>
  )
}

// Memoize the component to optimize performance
export default React.memo(DropDown)
