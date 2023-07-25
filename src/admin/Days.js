import React, { useState } from 'react';

const AppointmentForm = () => {
  // Get the current date
  const today = new Date();

  // Calculate the next 3-4 days
  const nextDays = [];
  for (let i = 0; i < 4; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    nextDays.push(nextDay.toLocaleString('id-ID', { weekday: 'long' }));
  }

  // State to hold the selected appointment date
  const [selectedDate, setSelectedDate] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedDate) {
        // Calculate the date for the selected day
        const selectedDayIndex = nextDays.findIndex((day) => day === selectedDate);
        const selectedDay = new Date(today);
        selectedDay.setDate(today.getDate() + selectedDayIndex);
  
        console.log('Selected Day:', selectedDate);
        console.log('Current Date of Selected Day:', selectedDay.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }));
      }
  };

  return (
    <div>
      <h2>Make an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentDate">Select Appointment Date:</label>
        <select
          id="appointmentDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="" disabled>
            Select a date
          </option>
          {nextDays.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedDate}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
