import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div>
        <nav className="navbar">
            <div className="logo">Logo</div>
            <ul className="nav-links">
            <li><a href="#">Beranda</a></li>
            <li><a href="#">Riwayat</a></li>
            <li><a href="#">Profil</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar