const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "janjitemu",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


//DAFTAR TELPON
app.post("/api/daftartelpon",(req,res)=>{

    const newNomorTelpon = req.body.newNomorTelpon

    const sqlInsert = "INSERT INTO janjitemu.nomortelpon (nomoruser) VALUES (?);"
    db.query(sqlInsert,[newNomorTelpon],(err, result)=>{
        if (err) {
            console.log("Error inserting data into the database:", err);
            res.status(500).send("Error occurred");
          } else {
            console.log("Successfully inserted data into the database");
            res.send("Radho");
          }
    })
})

//LOGIN ADMIN
app.post("/api/loginAdmin",(req,res)=>{
    const namars = req.body.namars
    const passwordrs = req.body.passwordrs

    const sqlTest = "SELECT * FROM janjitemu.rs WHERE namars = ? AND passwordrs = ?;"
    db.query(sqlTest,[namars,passwordrs],(err,result)=>{
        if (err) {
            console.log("Error inserting data into the database:", err);
        }
        if (result.length > 0){
            //console.log("ada") 
            //console.log(result)
            console.log(typeof namars)
            res.send(result)
        } else {
            console.log("no")
            res.send({message: "Not Found"})
        }
    })
})

//DATA DOKTER RS SEJAHTERA
app.post("/api/datadokter", (req, res) => {
  const inisial = req.body.inisial;
  const table = 'janjitemu.';
  const tableName = table + inisial;
  const sqlInsert = "SELECT * FROM ??;";
  db.query(sqlInsert, [tableName], (err, result) => {
    console.log(tableName);
    if (err) {
      console.log("Error fetching data from the database:", err);
    }
    if (result.length > 0) {
      res.send(result);
    }
  });
}); 

//DATA DOKTER SPESIALISASI 
app.post("/api/datadokterspesialisasi",(req,res)=>{
    const spesialisasi = req.body.spesialisasi
    const sqlInsert = "SELECT * FROM janjitemu.semuadokter WHERE spesialisasi = ?;"
    db.query(sqlInsert,[spesialisasi],(err,result)=>{
        if (err) {
            console.log("Error inserting data into the database:", err);
        }
        if(result.length > 0){
            res.send(result)
        }
    })
})






//CARI DOKTER ID RS SEJAHTERA
app.post("/api/iddokter",(req,res)=>{ 
    const namaDokter = req.body.nama_dokter
    const table = 'janjitemu.'
    const inisial = req.body.inisial
    const tableName = table + inisial
    const sqlInsert = "SELECT * FROM ?? WHERE nama_dokter = ?;"
    db.query(sqlInsert,[tableName, namaDokter],(err,result)=>{
        if (err) {
            console.log("Error inserting data into the database:", err);
        }
        if(result.length > 0){
            res.send(result)
        }
    })
})

//RIWAYAT DOKTER RS SEJAHTERA
app.post("/api/riwayatdokter",(req,res)=>{
    const nama_dokter = req.body.nama_dokter
    const inisial = req.body.inisial
    
    const jadwalappointment = 'janjitemu.jadwalappointment' + inisial
    const jadwaldoktor = 'janjitemu.jadwaldoktor' + inisial
    const rs = 'janjitemu.' + inisial

    const sql = "SELECT jp.id_appointment,rs.nama_dokter,jp.tanggal FROM ?? AS jp JOIN ?? AS ds ON jp.id_jadwalDoktor = ds.id_jadwalDoktor JOIN ?? AS rs ON rs.idDokter = ds.idDokter WHERE rs.nama_dokter = (?);"
    db.query(sql,[jadwalappointment, jadwaldoktor, rs, nama_dokter],(err,result)=>{
        if (err) {
            console.log("Error inserting data into the database:", err);
        }
        if (result.length > 0){
            console.log("ada") 
            //console.log(result)
            //console.log(nama_dokter)
            res.send(result)
        } else {
            // console.log(namaDokter)
            // console.log(result)
            res.send({message: "Not Found"})
        }
    })
})

//TAMBAHDOKTER RS SEJAHTERA
app.post("/api/tambahdokter",(req,res)=>{

    const idDokter = req.body.idDokter
    const idrs = req.body.idrs
    const namaDokter = req.body.namaDokter
    const table = 'janjitemu.'
    const inisial = req.body.inisial
    const tableName = table + inisial

    const sqlInsert = "INSERT INTO ?? (idDokter, idrs, nama_dokter) VALUES (?, ?, ?);"
    db.query(sqlInsert,[tableName, idDokter,idrs,namaDokter],(err, result)=>{
        // console.log(typeof idDokter)
        // console.log(typeof idrs)
        // console.log(typeof namaDokter)
        if (err) {
            console.log("Error inserting data into the database:", err);
            res.status(500).send("Error occurred");
          } else {
            console.log("Successfully inserted data into the database");
            res.send('ada');
          }
    })
})

//TAMBAH JADWAL DOKTER RS SEJAHTERA
app.post("/api/tambahjadwaldokter",(req,res)=>{
    const idDokter = req.body.idDokter
    const jamPraktek = req.body.jamPraktek
    const hariPraktek = req.body.hariPraktek
    const inisial = req.body.inisial
    const jadwaldoktor = 'janjitemu.jadwaldoktor' + inisial
    const jadwalpraktek = 'janjitemu.jadwalpraktek' + inisial
    const sqlInsert = "INSERT INTO ?? (idDokter, id_jadwal) VALUES (?, (SELECT id_jadwal FROM ?? WHERE jam_praktek = ? AND hari_praktek = ?));"
    db.query(sqlInsert,[jadwaldoktor, idDokter,jadwalpraktek,jamPraktek,hariPraktek],(err,result)=>{
        if(err){
            console.log("Error inserting data into the database:", err);
            res.status(500).send("Error occurred");
        } else {
            console.log("Successfully inserted data into the database");
            res.send('nambah');
        }
    })
})

//HAPUS DOKTER RS SEJAHTERA
app.post("/api/hapusdokter",(req,res)=>{

    const idDokter = req.body.idDokter
    const idrs = req.body.idrs
    const namaDokter = req.body.namaDokter
    const inisial = req.body.inisial
    const table = 'janjitemu.'
    const tableName = table + inisial

    const sqlInsert = "DELETE FROM ?? WHERE idDokter = ? AND idrs = ? AND nama_dokter = ?;"
    db.query(sqlInsert,[tableName,idDokter,idrs,namaDokter],(err, result)=>{
        // console.log(typeof idDokter)
        // console.log(typeof idrs)
        // console.log(typeof namaDokter)
        if (err) {
            console.log("Error inserting data into the database:", err);
            res.status(500).send("Error occurred");
          } else {
            console.log("Successfully inserted data into the database");
            res.send('ada');
          }
    })
})

//CARI JADWAL DOKTER
app.post("/api/jadwaldokter",(req,res)=>{

    const nama_dokter = req.body.namaDokter
    const days = req.body.days
    const hours = req.body.hours
    const inisial = req.body.inisial
    const janjitemuDot = 'janjitemu.'

    const rssejahtera = janjitemuDot + inisial
    const jadwaldoktorrssejahtera = janjitemuDot + 'jadwaldoktor' + inisial
    const jadwalpraktekrssejahtera = janjitemuDot + 'jadwalpraktek' + inisial

    const sqlInsert = 
    "SELECT rs.nama_dokter,jp.jam_praktek,jp.hari_praktek FROM ?? AS rs JOIN ?? AS jd ON rs.idDokter = jd.idDokter JOIN ?? AS jp ON jd.id_jadwal = jp.id_jadwal WHERE rs.nama_dokter = ? AND jp.jam_praktek = ? AND jp.hari_praktek = ?;"
    db.query(sqlInsert,[rssejahtera, jadwaldoktorrssejahtera, jadwalpraktekrssejahtera, nama_dokter,hours,days],(err, result)=>{
        //console.log(nama_dokter)
        if (err) {
            console.log("Error inserting data into the database:", err);
            console.log(nama_dokter)
            console.log(days)
            console.log(hours)
            res.status(500).send("Error occurred");
          } else {
            // console.log("Successfully inserted data into the database");
            // res.send('ada');
            if (result.length > 0){
                //console.log("ada")
                res.send(true)
            } else {
                //console.log("salah")
                res.send(false)
            }
          }
    })
})





app.listen(3001,() => {
    console.log("Running on port 3001")
})