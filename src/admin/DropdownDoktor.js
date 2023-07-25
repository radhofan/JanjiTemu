import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import DropdownSearchBar from './DropdownSearchBar'
import Axios from 'axios'
import Days from './Days'
import TabelDoktor from './TabelDoktor'
import NavbarAdmin from './NavbarAdmin'

function RumahSakit() {
    //const idRumahSakit = useSelector((state)=> state.admin.value.idRumahSakit)
    // const initialData = Array(100).fill({
    //   idDokter: null,
    //   idrs: null,
    //   nama_dokter: "",
    // });
    // const [dataDokter, setDataDokter] = useState(initialData)
    const [options, setOptions] = useState([""])
    const idRumahSakit = 1

    const [data,setData] = useState([])
    const inisial = useSelector((state) => state.admin.value.inisial);
    
    useEffect(() => {
      if (idRumahSakit === 1) {
        Axios.post('http://localhost:3001/api/datadokter', {
          inisial: inisial
        })
          .then((response) => {
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
      Axios.post('http://localhost:3001/api/riwayatdokter',{
        nama_dokter: selectedOption,
        inisial: inisial
      }).then((response)=>{
          //console.log(response)
          setData(response.data)
          //cconsole.log(data)
      })
    };

    function test(){
      console.log(data)
    }


  return (
    <div>
      <DropdownSearchBar options={options} onSelect={handleSelectOption} />
      <button onClick={test}>cek</button>
      <tbody>
            {data.map((item) => (
              <tr key={item.id_appointment}>
                <td>{item.id_appointment}</td>
                <td>{item.nama_dokter}</td>
                <td>{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
    </div>
  )

}

export default RumahSakit