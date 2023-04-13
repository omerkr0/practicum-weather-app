import React from 'react'
import DropDown from './DropDown'
import DayList from './DayList'

function Container() {
  return (
    <div>
      {/* Render the dropdown component */}
      <DropDown />

      {/* Render the day list component */}
      <DayList />
    </div>
  )
}

export default Container
