import React,{useState} from 'react'
import Navbar from './Navbar'
import './BuatJanji.css'
import Axios from 'axios'
import { Navigate } from 'react-router-dom';

function BuatJanji() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [listDokter,setListDokter] = useState([]);
  const [pageDokter,setPageDokter] = useState(false);
  const [idDokter,setIdDokter] = useState(0)

  function dokterPage(id){
    setIdDokter(id)
    setPageDokter(true)
  }

  const handleItemClick = (spesialis) => {
    setSelectedItem(spesialis);
    Axios.post('http://localhost:3001/api/datadokterspesialisasi',{
        spesialisasi: spesialis,
    }).then((response)=>{
      //  console.log(response.data)
      setListDokter(response.data)
    }) 
  };
    const dataSpesialis = [
        'Kardiologi',
        'Dermatologi',
        'Endokrinologi',
        'Gastroenterologi',
        'Neurologi',
        'Onkologi',
        'Pediatrik',
        'Reumatologi',
        'Urologi',
        'Obstetri dan Ginekologi',
    ];

  return (
    <div>

        <Navbar/>

        <div className='outer-container'>
        <div className="search-container">
          <div className="search">
            <ul className='spesialis-list'>
              {dataSpesialis.map((spesialis, index) => (
                <li key={index} onClick={() => handleItemClick(spesialis)}>{spesialis}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      <div className='lower-container'>
        <h2>List of Doctors with Specialization: {selectedItem}</h2>
          <ul>
            {listDokter.map((dokter) => (
              <li key={dokter.idDokter} onClick={()=>dokterPage(dokter.idDokter)}>{dokter.nama_dokter}</li>
            ))}
            {idDokter && (<Navigate to="/dokter/${dokter.idDokter}" state={{ idDokter: idDokter }} replace={true}/>)}
          </ul>
          
      </div>

    </div>
  )
}

export default BuatJanji