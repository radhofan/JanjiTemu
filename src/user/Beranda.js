import React from 'react'
import Navbar from './Navbar'
import './Beranda.css'

function Beranda() {
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
        <ul>Buat Janji</ul>
        <ul>Medical Check-Up</ul>
        <ul>Radiologi</ul>
        <ul>Cek Lab</ul>
        <ul>Tes Covid-19</ul>
      </div>


    </div>
  )
}

export default Beranda