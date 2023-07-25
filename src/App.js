
import './App.css';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const [guest, setGuest] = useState(false);
  const [loginAdmin, setLoginAdmin] = useState(false);

  function pasien(){
    setGuest(true)
  }

  function admin(){
    setLoginAdmin(true)
  }

  return (
    <div className='container'>
      <div className="centered">
        <h1>Selamat Datang Di Aplikasi JanjiTemu!</h1>
        <button onClick={pasien}>Guest</button>
        <button onClick={admin}>Admin</button>
        {guest && (<Navigate to="/Beranda" replace={true} />)}
        {loginAdmin && (<Navigate to="/loginAdmin" replace={true}/>)}
      </div>
    </div>
  );
}

export default App;
