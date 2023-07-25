import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Axios from 'axios';

const TabelDoktor = (props) => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const hours = ['08:00-10:00', '10:00-12:00', '12:00-14:00'];

  // Initialize the cell data state as an empty object
  const [cellData, setCellData] = useState({}); 
  const [showForm, setShowForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const inisial = useSelector((state) => state.admin.value.inisial);

  function test(){
    console.log(typeof props.nama)
  }

  useEffect(() => {
    // Function to fetch the data and update cellData state
    async function fetchData(day, hour) {
      try {
        const response = await Axios.post('http://localhost:3001/api/jadwaldokter', {
          namaDokter: props.nama,
          days: day,
          hours: hour,
          inisial: inisial
        });
        setCellData((prevCellData) => {
          const key = `${day}-${hour}`;
          return { ...prevCellData, [key]: response.data };
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Loop through all combinations of day and hour to fetch data
    days.forEach((day) => {
      hours.forEach((hour) => {
        fetchData(day, hour);
      });
    });
  }, [props.nama]);

  function renderCellStatus(day, hour) {
    const key = `${day}-${hour}`;
    const status = cellData[key];
  
    if (status === undefined) {
      // Data is being fetched, show a loading state
      return 'Loading...';
    } else {
      // Data is available, show the status ('Available' or 'Not Available')
      return status ? 'Available' : 'Not Available';
    }
  }


  const handleAddSchedule = () => {
    if (selectedDay && selectedHour) {
      const key = `${selectedDay}-${selectedHour}`;
      // Check if the key exists in cellData
      if (cellData[key] === 'Not Available') {
        // The schedule already exists, handle it accordingly (e.g., show a message)
        console.log('Schedule already exists!');
      } else {
        Axios.post('http://localhost:3001/api/tambahjadwaldokter',{
            idDokter: props.idDokter,
            jamPraktek: selectedHour,
            hariPraktek: selectedDay,
            inisial: inisial
        }).then((response)=>{
            if (response.data){
                console.log("ga ketemu")
            } else {
                
            }
        })
      }
    }
  };

  return (
    <table className="schedule-grid">
      <thead>
        <tr>
          <th></th>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.map((hour) => (
          <tr key={hour}>
            <td>{hour}</td>
            {days.map((day) => {
              return (
                <td key={day}>
                  {/* {cellData[`${day}-${hour}`] || 'Not Available'} */}
                  {/* {renderData(day,hour) ? 'Available' : 'Not Available'} */}
                  {renderCellStatus(day, hour)}
                </td>
              );
            })}
          </tr> 
        ))}
      </tbody>
       {/* Show the form when the button is clicked */}
      {showForm && (
        <div>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
            <option value="">Select Hour</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          {/* Button to submit the form */}
          <button onClick={handleAddSchedule}>Submit</button>
        </div>
      )}
      {/* Button to toggle the form visibility */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Schedule'}
      </button>
      <button onClick={test}>debug</button>
    </table>
  );
};

export default TabelDoktor;
