import React from 'react';
import { useLocation } from 'react-router-dom';
import orangUtan from '../photo/orangUtan.jpg'; // Import your placeholder image
import './Doktor.css'
import Navbar from './Navbar';
import FutureDates from './Futuredate';

function Dokter() {
  const location = useLocation();
  const idDokter = location.state?.idDokter || '';

  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="left">
          <img src={orangUtan} alt="Doctor" className="doctor-img" />
        </div>
        <div className="right">
          {/* Replace the content below with the actual product description */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur quam quis ultrices bibendum. Nulla facilisi. Integer eu tincidunt ligula. Curabitur vitae felis ac orci bibendum venenatis in eget purus.
          </p>
          <button className="appointment-btn">Make Appointment</button>
        </div>
        <FutureDates/>
      </div>
    </div>
  );
}

export default Dokter;
