import React, {useState} from 'react'
import Navbar from './Navbar'
import {login, logout} from "../store"
import { useDispatch, useSelector } from "react-redux"
import './Profil.css'
import Axios from 'axios'

function Profil() {
  const [newNomorTelpon, setNomorTelpon] = useState("")
  const [daftar, setDaftar] = useState(false)
  const [masuk, setMasuk] = useState(false)

  const submitDaftartelpon = () => {
    dispatch(login({username: newNomorTelpon, ada:true}))
    Axios.post('http://localhost:3001/api/daftartelpon',
    {newNomorTelpon: newNomorTelpon}).then(()=>{alert("success")})
  }

  function tombolDaftar(){
    setDaftar(true) 
  }
  function tombolMasuk(){ 
    setDaftar(false)
  }

  const dispatch = useDispatch();
  const nomorTelpon = useSelector((state)=> state.user.value.username)

  function sudahLogin(){
    dispatch(login({username: newNomorTelpon, ada:true}))
    setMasuk(true)
  }

  function keluar(){
    dispatch(logout())
    setMasuk(false)
  }



  return (
    <div>
      <Navbar/>
      <div className="containerProfil">
        <ul className="ulcontainer">
          <li className="licontainer" onClick={tombolMasuk}>Masuk</li>
          <li className="licontainer" onClick={tombolDaftar}>Daftar</li>
        </ul>

        {masuk ? (!daftar && <div><div>Anda Sudah Masuk Sebagai {nomorTelpon}</div><button onClick={keluar}>Logout</button></div>)
        :  (!daftar && <div> <label>Masukkan No.Telpon Anda</label>
        <input className='inputProfil' type='text' onChange={(e)=>{setNomorTelpon(e.target.value)}}/>
        <button className='buttonProfil' onClick={sudahLogin}>Login</button></div>)}

        {daftar && <div> <label>Masukkan No.Telpon Anda</label>
        <input className='inputProfil' type='text' onChange={(e)=>{setNomorTelpon(e.target.value)}}/>
        <button className='buttonProfil' onClick={submitDaftartelpon}>Daftar</button></div>}
      </div>
    </div>
  )
}

export default Profil