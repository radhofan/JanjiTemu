import React,{useState} from 'react'
import Navbar from './Navbar'
import { Navigate } from 'react-router-dom';
import './Beranda.css'

function Beranda() {
  const [buatJanji,setBuatJanji] = useState(false)
  function doBuatJanji(){
    setBuatJanji(true)
  }
  return (
    <div>

      <Navbar/>

      <div className='outer-container'>
        <div className="search-container">
          <div className="search">
            <label>Cari Dokter/Layanan Medis/Rumah Sakit dll</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <div className='lower-container'>
        <ul onClick={doBuatJanji}>Buat Janji</ul>
        <ul>Medical Check-Up</ul>
        <ul>Radiologi</ul>
        <ul>Cek Lab</ul>
        <ul>Tes Covid-19</ul>
        {buatJanji && (<Navigate to="/BuatJanji" replace={true} />)}
      </div>


    </div>
  )
}

export default Beranda