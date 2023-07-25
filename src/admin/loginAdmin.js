import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import { Navigate } from 'react-router-dom';
import {loginAdmin, logoutAdmin} from "../store"
import { useDispatch, useSelector } from "react-redux"

function LoginAdmin() {

  const [namars,setNamars] = useState("")
  const [passwordrs,setPasswordrs] = useState("")
  const [boleh, setBoleh] = useState(false)

  const dispatch = useDispatch()



  const clickButton = () => {

    Axios.post('http://localhost:3001/api/loginAdmin',{
        namars: namars, 
        passwordrs: passwordrs,
    }).then((response)=>{
        if (response.data.message){
            console.log("ga ketemu")
        } else {
            //console.log(response.data[0].inisialrs)
            dispatch(loginAdmin({idRumahSakit: response.data[0].idrs, inisial: response.data[0].inisialrs}))
            setBoleh(true)
        }
    }) 


  }


  return (
    <div>
        <div>
            <label>Rumah Sakit/Organisasi</label>
            <input type="text" onChange={(e)=>{setNamars(e.target.value)}}></input>
            <label>Password</label>
            <input type="text" onChange={(e)=>{setPasswordrs(e.target.value)}}></input>
            <button onClick={clickButton}></button>
            {boleh && (<Navigate to="/JadwalDokter" replace={true}/>)}
        </div>
    </div>
  )
}

export default LoginAdmin