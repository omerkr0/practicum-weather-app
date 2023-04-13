import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useWeatherContext } from '../context/WeatherContext'

function DayList() {
  // Get the weather data from the context
  let { weatherData } = useWeatherContext()
  console.log(weatherData)
  return (
    <>
      {/* Create a row with columns to display each day's weather */}
      <Row className="row-cols-1 row-cols-md-5 g-4">
        {/* Loop over the weather data and create a card for each day */}
        {weatherData.map((item, index) => {
          // Extract the day of the week from the date
          const date = new Date(item.date)
          const dayNumber = date.getDay()
          const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
          const day = daysOfWeek[dayNumber]

          // Create a Bootstrap card to display the day's weather information
          return (
            <Col key={index}>
              <Card
                bg={index === 0 ? 'info' : ''}
                text={index === 0 ? 'light' : ''}
                className="h-100"
              >
                <Card.Body>
                  {/* Display the day of the week in the card title */}
                  <Card.Title className="text-center">{day}</Card.Title>
                  {/* Display an icon representing the weather condition */}
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={item.day.condition.icon}
                      alt="desc"
                      className="cardImage"
                    ></img>
                  </div>
                  {/* Display the maximum and minimum temperature for the day */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-bold">{item.day.maxtemp_c}°C</span> /{' '}
                      {item.day.mintemp_c}°C
                    </div>
                    {/* Display a description of the weather condition */}
                    <div>{item.day.condition.text}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

// Use the React.memo() function to memoize the DayList component
// This will prevent unnecessary re-renders when the weather data is updated
export default React.memo(DayList)
