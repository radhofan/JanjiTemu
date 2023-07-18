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

app.listen(3001,() => {
    console.log("Running on port 3001")
})