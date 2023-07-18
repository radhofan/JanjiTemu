import React, { useState } from 'react'
import './Navbar.css'
import { Navigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

function Navbar() {
  const [beranda, setBeranda] = useState(false)
  const [riwayat, setRiwayat] = useState(false)
  const [profil, setProfil] = useState(false)

  function funcBeranda(){
    setBeranda(true)
  }
  function funcRiwayat(){
    setRiwayat(true)
  }
  function funcProfil(){
    setProfil(true)
  }

  const nomorTelpon = useSelector((state)=> state.user.value.username)
  const ada = useSelector((state)=> state.user.value.ada)
  return (
    <div>
        <nav className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-links">
              <li> {nomorTelpon} </li>
              <li onClick={funcBeranda}>Beranda</li>
              <li onClick={funcRiwayat}>Riwayat</li>
              <li onClick={funcProfil}>Profil</li>
              {beranda && (<Navigate to="/Beranda" replace={true} />)}
              {riwayat && (<Navigate to="/Riwayat" replace={true} />)}
              {profil && (<Navigate to="/Profil" replace={true} />)}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar