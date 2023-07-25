import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

const FutureDates = () => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const hours = ['08:00-10:00', '10:00-12:00']; // Modify this array with the desired hours
  const futureDates = [];
  const currentDate = new Date();
  const [cellData, setCellData] = useState({});
  const data = [
    {
        id_appointment: 3,
        tanggal: '26/07/23',
        id_jadwalDokter: 1,
        hari: 'Rabu',
        jamPraktek: '08:00-10:00'
    },
    {
        id_appointment: 1,
        tanggal: '26/07/23',
        id_jadwalDokter: 1,
        hari: 'Kamis',
        jamPraktek: '08:00-10:00'
    },
  ]

  useEffect(() => {
    // Function to fetch the data and update cellData state
    async function fetchData(day, hour) {
      try {
        const response = await Axios.post('http://localhost:3001/api/jadwaldokter', {
          namaDokter: 'Budi',
          days: day,
          hours: hour,
          inisial: 'rssejahtera',
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
    for (let i = 0; i < futureDates.length; i++) {
      const dateInfo = futureDates[i];
      const day = dateInfo.day;
      const hours = dateInfo.hours;
      days.forEach((d) => {
        if (d === day) {
          hours.forEach((hour) => {
            fetchData(day, hour);
          });
        }
      });
    }
  }, []);

  function renderCellStatus(day, hour) {
    const key = `${day}-${hour}`;
    const status = cellData[key];
  
    if (status === undefined) {
      // Data is being fetched, show a loading state
      return 'Loading...';
    } else if (status) {
      // Data is available, show the hours ('Available' or 'Not Available')
      return status ? 'Available' : 'Not Available';
    } else {
      // Data is not available, hide the hours
      return '';
    }
  }

  function getStatusFromData(day, date, hour) {
    const matchingData = data.find(
      (item) => item.hari === day && item.tanggal === date && item.jamPraktek === hour
    );
    return matchingData ? 'Booked' : 'Not Booked';
  }
  
  for (let i = 1; i <= 5; i++) {
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + i);

    const day = futureDate.toLocaleString('id-ID', { weekday: 'long' });
    const date = futureDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' });

    futureDates.push({ day, date, hours });
  }

  return (
    <div>
      <h2>Future 5 Days:</h2>
      <ul>
        {futureDates.map((dateInfo, index) => (
          <li key={index}>
            <p>{`${dateInfo.day}, ${dateInfo.date}`}</p>
            <ul>
              {dateInfo.hours.map((hour, idx) => (
                <div key={idx}>
                  {renderCellStatus(dateInfo.day, hour) && <li>{hour}</li>}
                  <li>{renderCellStatus(dateInfo.day, hour)}</li>
                  <li>{getStatusFromData(dateInfo.day, dateInfo.date, hour)}</li>
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FutureDates;
