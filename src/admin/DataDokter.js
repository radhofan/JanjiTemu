import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import NavbarAdmin from './NavbarAdmin'
import Axios from 'axios'

function DataDokter() {
  const data = {
    idDokter: 0,
    idrs: 0,
    nama_dokter: "",
  }

  const initialData = Array(100).fill({
    idDokter: null,
    idrs: null,
    nama_dokter: "",
  });

  const [dataDokter, setDataDokter] = useState(initialData)
  const [options, setOptions] = useState([""])
  const idRumahSakit = 1

  const inisial = useSelector((state) => state.admin.value.inisial);
  useEffect(() => {
    if (idRumahSakit === 1) {
      Axios.post('http://localhost:3001/api/datadokter', {
        inisial: inisial
      })
        .then((response) => {
          const dataSize = response.data.length;
          const updatedData = Array(dataSize).fill(null).map((_, index) => response.data[index]);
          setDataDokter(updatedData);
          const data = updatedData.map((item) => item);
          setOptions(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  function test(){
    console.log(options)
  }

  const [idDokter, setIdDokter] = useState(0);
  const [idRs, setIdRs] = useState(0);
  const [namaDokter, setNamaDokter] = useState('');
  const [dokterBaru,setDokterBaru] = useState(false)
  const tambahDokter = (item) => {
    setDokterBaru(true)
  };
  const sendTambahDokter = () => {
    const idDokterNumber = parseInt(idDokter);
    const idRsNumber = parseInt(idRs);
    Axios.post('http://localhost:3001/api/tambahdokter',{
      idDokter: idDokterNumber,
      idrs: idRsNumber,
      namaDokter: namaDokter,
      inisial: inisial,
    }).then(()=>{alert("success")})
  };

  const hapusDokter = (item) => {
    // console.log('Button clicked for:', item.idDokter);
    Axios.post('http://localhost:3001/api/hapusdokter',{
      idDokter: item.idDokter,
      idrs: item.idrs,
      namaDokter: item.nama_dokter,
      inisial: inisial,
    }).then(()=>{alert("success")})
  };



  return (
    <div>
      <NavbarAdmin />
      <h2>Data Dokter:</h2>
      <button onClick={()=>tambahDokter()}>Tambah Dokter</button>
      {dokterBaru && <div>
        <label>Id Dokter</label>
          <input
            type='text'
            value={idDokter}
            onChange={(e) => setIdDokter(e.target.value)}
          />
          <label>Id Rs</label>
          <input
            type='text'
            value={idRs}
            onChange={(e) => setIdRs(e.target.value)}
          />
          <label>Nama Dokter</label>
          <input
            type='text'
            value={namaDokter}
            onChange={(e) => setNamaDokter(e.target.value)}
          />
        <button onClick={sendTambahDokter}>Submit</button>
        </div>}
      <table>
        <thead>
          <tr>
            <th>Id Dokter</th>
            <th>Id Rumah Sakit</th>
            <th>Nama</th>
            <th>Hapus</th> {/* Add a new column for the button */}
          </tr>
        </thead>
        <tbody>
          {options.map((item, index) => (
            <tr key={index}>
              <td>{item.idDokter}</td>
              <td>{item.idrs}</td>
              <td>{item.nama_dokter}</td>
              <td>
                <button onClick={() => hapusDokter(item)}>
                  Click Me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDokter