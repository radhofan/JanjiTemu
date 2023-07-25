import React, { useState } from 'react'
import '../user/Navbar.css'
import { Navigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

function Navbar() {
  const [jadwalDokter, setJadwalDokter] = useState(false)
  const [riwayatDokter, setRiwayatDokter] = useState(false)
  const [dataDokter, setDataDokter] = useState(false)

  function funcJadwalDokter(){
    setJadwalDokter(true)
  }
  function funcRiwayatDokter(){
    setRiwayatDokter(true)
  }
  function funcDataDokter(){
    setDataDokter(true)
  }

  const nomorTelpon = useSelector((state)=> state.user.value.username)
  const ada = useSelector((state)=> state.user.value.ada)
  return (
    <div>
        <nav className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-links">
              {/* <li> {nomorTelpon} </li> */}
              <li onClick={funcJadwalDokter}>Jadwal Dokter</li>
              <li onClick={funcRiwayatDokter}>Riwayat Dokter</li>
              <li onClick={funcDataDokter}>Data Dokter</li>
              {jadwalDokter && (<Navigate to="/JadwalDokter" replace={true} />)}
              {riwayatDokter && (<Navigate to="/RiwayatDokter" replace={true} />)}
              {dataDokter && (<Navigate to="/DataDokter" replace={true} />)}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar