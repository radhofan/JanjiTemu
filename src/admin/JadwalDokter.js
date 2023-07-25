import NavbarAdmin from './NavbarAdmin'
import DropdownDoktor from './DropdownDoktor'
import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import DropdownSearchBar from './DropdownSearchBar'
import Axios from 'axios'
import Days from './Days'
import TabelDoktor from './TabelDoktor'

function JadwalDokter() {
  const [options, setOptions] = useState([""])
  const [data,setData] = useState([])
  const [idDokter, setIdDokter] = useState(0)
  const idRumahSakit = 1
  const inisial = useSelector((state) => state.admin.value.inisial);
  useEffect(() => {
    if (idRumahSakit === 1) {
      Axios.post('http://localhost:3001/api/datadokter',{
        inisial: inisial
      }).then((response) => {
          const dataSize = response.data.length;
          const updatedData = Array(dataSize).fill(null).map((_, index) => response.data[index]);
          //setDataDokter(updatedData);
          const data = updatedData.map((item) => item.nama_dokter);
          setOptions(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);
  const handleSelectOption = (selectedOption) => {
    // console.log(selectedOption)
    Axios.post('http://localhost:3001/api/iddokter',{
      nama_dokter: selectedOption,
      inisial: inisial
    }).then((response)=>{
        //console.log(response) 
        setData(response.data)
        //cconsole.log(data)
    })
  };

  const [nama, setNama] = useState('')
  useEffect(() => {
    if (data.length > 0) {
      setNama(data[0].nama_dokter);
      setIdDokter(data[0].idDokter)
    }
  }, [data]);
  function test(){
    //console.log(data[0].nama_dokter)
    console.log("AAA")
    console.log(inisial)
  }

  return (
    <div>
        <NavbarAdmin/>
        <DropdownSearchBar options={options} onSelect={handleSelectOption} />
        <button onClick={test}>cek</button>
        <TabelDoktor nama={nama} idDokter={idDokter}/> 
    </div>
  )
} 

export default JadwalDokter